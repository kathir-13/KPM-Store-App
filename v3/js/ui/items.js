import { fetchItems, fetchOutstandingMap, availableQty, createItem, updateItem, setItemActive, uploadItemPhoto } from '../services/itemsService.js';
import { resizeImageFile } from '../utils/image.js';
import { money } from '../utils/money.js';
import { t } from '../i18n/i18n.js';
import { toast } from './toast.js';
import { openModal, closeModal } from './modal.js';
import { showLoading, hideLoading } from './loading.js';

let itemsCache = [];
let outstandingMap = {};
let editingItemId = null;
let pendingPhotoFile = null;

function escapeHtml(s){
  return (s || '').toString().replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

export async function renderItems(){
  const container = document.getElementById('screen-items-inner');
  container.innerHTML = `
    <button class="btn btn-brass btn-block" id="addItemBtn">➕ ${t('add_new_item')}</button>
    <div class="section-label">${t('all_items')}</div>
    <div id="itemsList">
      <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>
    </div>
  `;
  document.getElementById('addItemBtn').addEventListener('click', () => openItemForm(null));

  try{
    const [items, outstanding] = await Promise.all([fetchItems(true), fetchOutstandingMap()]);
    itemsCache = items;
    outstandingMap = outstanding;
    renderItemsList();
  }catch(e){
    document.getElementById('itemsList').innerHTML = `<div class="alert danger">${e.message}</div>`;
    toast(e.message);
  }
}

function renderItemsList(){
  const list = document.getElementById('itemsList');
  if(itemsCache.length === 0){
    list.innerHTML = `<div class="empty-state"><div class="ic">🍽️</div><div class="t">${t('no_items_yet')}</div><div class="d">${t('tap_add_item')}</div></div>`;
    return;
  }
  list.innerHTML = itemsCache.map(item => {
    const rentedQty = outstandingMap[item.id] || 0;
    const avail = availableQty(item, outstandingMap);
    const thumb = item.photo_url ? `<img src="${item.photo_url}" style="width:100%;height:100%;object-fit:cover;">` : '🍽️';
    const primaryName = item.name_ta || item.name || '—';
    const secondaryName = item.name_ta && item.name ? item.name : '';
    return `
      <div class="card" style="display:flex; gap:14px; align-items:center;">
        <div style="width:64px;height:64px;border-radius:12px;background:var(--surface-2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden;color:var(--muted);">${thumb}</div>
        <div style="flex:1; min-width:0;">
          <div style="font-weight:800; font-size:var(--fs-name-lg);">${escapeHtml(primaryName)}</div>
          ${secondaryName ? `<div style="font-size:var(--fs-body); color:var(--muted);">${escapeHtml(secondaryName)}</div>` : ''}
          <div style="font-size:var(--fs-body); color:var(--ink-soft); font-weight:700; margin-top:4px;">${money(item.price)}</div>
          <div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">
            <span class="badge" style="background:var(--surface-2); color:var(--ink-soft);">${t('total')} ${item.total_qty}</span>
            ${item.active
              ? `<span class="badge" style="background:${avail<=0?'var(--danger-bg)':'var(--success-bg)'}; color:${avail<=0?'var(--danger)':'var(--success)'};">${avail<=0?t('out_of_stock'):t('available')+' '+avail}</span>`
              : `<span class="badge" style="background:var(--danger-bg); color:var(--danger);">${t('inactive')}</span>`}
            ${rentedQty > 0 ? `<span class="badge" style="background:var(--warning-bg); color:var(--warning);">${t('rented')} ${rentedQty}</span>` : ''}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn btn-outline btn-sm edit-item-btn" data-id="${item.id}" style="min-height:auto; padding:10px 14px;">${t('edit')}</button>
          <button class="btn ${item.active?'btn-danger-outline':'btn-outline'} btn-sm toggle-item-btn" data-id="${item.id}" style="min-height:auto; padding:10px 14px;">${item.active?t('deactivate'):t('activate')}</button>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.edit-item-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> openItemForm(btn.dataset.id));
  });
  list.querySelectorAll('.toggle-item-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> toggleItemActive(btn.dataset.id));
  });
}

function openItemForm(itemId){
  editingItemId = itemId;
  pendingPhotoFile = null;
  const item = itemId ? itemsCache.find(i => i.id === itemId) : null;

  const html = `
    <div class="modal-header"><h3>${item ? t('edit') : t('add_new_item')}</h3><button class="modal-close" id="itemFormClose">✕</button></div>
    <div id="itemPhotoUpload" style="width:100%; height:140px; border-radius:12px; border:1.5px dashed var(--line); background:var(--surface-2); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; color:var(--muted); margin-bottom:14px; overflow:hidden;">
      ${item && item.photo_url ? `<img src="${item.photo_url}" style="width:100%;height:100%;object-fit:cover;">` : `<span style="font-size:30px;">📷</span><span style="font-weight:700;">${t('take_upload_photo')}</span>`}
    </div>
    <input type="file" accept="image/*" capture="environment" id="itemPhotoInput" style="display:none">
    <div class="field"><label>${t('item_name_ta')} *</label><input type="text" id="itemNameTaInput" value="${item && item.name_ta ? escapeHtml(item.name_ta) : ''}" placeholder="தமிழில் பெயர்"></div>
    <div class="field"><label>${t('item_name_en')}</label><input type="text" id="itemNameEnInput" value="${item && item.name ? escapeHtml(item.name) : ''}" placeholder="e.g. Chair"></div>
    <div class="field"><label>${t('total_qty')} *</label><input type="number" id="itemQtyInput" min="0" value="${item ? item.total_qty : ''}" placeholder="e.g. 100"></div>
    <div class="field"><label>${t('price')} *</label><input type="number" id="itemPriceInput" min="0" value="${item ? item.price : ''}" placeholder="e.g. 5"></div>
    <button class="btn btn-brass btn-block" id="saveItemBtn">${t('save_item')}</button>
  `;
  openModal(html);

  document.getElementById('itemFormClose').addEventListener('click', closeModal);
  document.getElementById('itemPhotoUpload').addEventListener('click', () => document.getElementById('itemPhotoInput').click());
  document.getElementById('itemPhotoInput').addEventListener('change', handlePhotoSelect);
  document.getElementById('saveItemBtn').addEventListener('click', saveItemForm);
}

function handlePhotoSelect(e){
  const file = e.target.files[0];
  if(!file) return;
  pendingPhotoFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('itemPhotoUpload').innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
  };
  reader.readAsDataURL(file);
}

async function saveItemForm(){
  const nameTa = document.getElementById('itemNameTaInput').value.trim();
  const nameEn = document.getElementById('itemNameEnInput').value.trim();
  const qty = parseInt(document.getElementById('itemQtyInput').value);
  const price = parseFloat(document.getElementById('itemPriceInput').value);

  if(!nameTa){ toast(t('tamil_name_required')); return; }
  if(isNaN(qty) || qty < 0){ toast(t('valid_qty_required')); return; }
  if(isNaN(price) || price < 0){ toast(t('valid_price_required')); return; }

  const btn = document.getElementById('saveItemBtn');
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = t('saving');

  try{
    let photoUrl = editingItemId ? (itemsCache.find(i => i.id === editingItemId) || {}).photo_url : null;
    if(pendingPhotoFile){
      const blob = await resizeImageFile(pendingPhotoFile, 500);
      photoUrl = await uploadItemPhoto(blob);
    }
    const payload = { name: nameEn, name_ta: nameTa, total_qty: qty, price, photo_url: photoUrl };
    if(editingItemId) await updateItem(editingItemId, payload);
    else await createItem(payload);

    closeModal();
    toast(t('item_saved'));
    renderItems();
  }catch(e){
    toast(e.message);
    btn.disabled = false;
    btn.textContent = original;
  }
}

async function toggleItemActive(itemId){
  const item = itemsCache.find(i => i.id === itemId);
  if(item.active && !confirm(t('deactivate_confirm'))) return;
  showLoading();
  try{
    await setItemActive(itemId, !item.active);
    toast(item.active ? t('item_deactivated') : t('item_activated'));
    await renderItems();
  }catch(e){
    toast(e.message);
  }
  hideLoading();
}
