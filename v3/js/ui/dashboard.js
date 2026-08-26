import { getDashboardStats } from '../services/dashboardService.js';
import { t } from '../i18n/i18n.js';
import { getProfile } from '../state/appState.js';
import { toast } from './toast.js';

export function renderDashboardTiles(){
  const isAdmin = getProfile()?.role === 'admin';
  document.getElementById('dashTiles').innerHTML = `
    <button class="tile primary" onclick="window.kpmNav('new-rental')"><span class="ic">➕</span><span class="lbl">${t('new_rental')}</span></button>
    <button class="tile" onclick="window.kpmNav('active-rentals')"><span class="ic">📦</span><span class="lbl">${t('active_rentals')}</span></button>
    <button class="tile" onclick="window.kpmNav('edit-rental')"><span class="ic">✏️</span><span class="lbl">${t('edit_active_rental')}</span></button>
    <button class="tile" onclick="window.kpmNav('returns')"><span class="ic">↩️</span><span class="lbl">${t('return_items')}</span></button>
    <button class="tile" onclick="window.kpmNav('payments')"><span class="ic">💰</span><span class="lbl">${t('payments')}</span></button>
    <button class="tile" onclick="window.kpmNav('items')"><span class="ic">🍽️</span><span class="lbl">${t('manage_items')}</span></button>
    <button class="tile" onclick="window.kpmNav('transactions')"><span class="ic">📜</span><span class="lbl">${t('all_transactions')}</span></button>
    <button class="tile" onclick="window.kpmNav('reports')"><span class="ic">📊</span><span class="lbl">${t('reports_lbl')}</span></button>
    ${isAdmin ? `<button class="tile" onclick="window.kpmNav('users')"><span class="ic">👤</span><span class="lbl">${t('user_management')}</span></button>` : ''}
    <button class="tile" onclick="window.kpmNav('settings')"><span class="ic">⚙️</span><span class="lbl">${t('settings_lbl')}</span></button>
  `;
}

export async function renderDashboard(){
  renderDashboardTiles();
  const statsEl = document.getElementById('dashStats');
  statsEl.innerHTML = `<div class="skeleton" style="grid-column:1/-1; height:110px;"></div>`;
  try{
    const s = await getDashboardStats();
    statsEl.innerHTML = `
      <div class="stat warn" style="padding:22px;">
        <div class="n num" style="font-size:var(--fs-total-lg);">${s.active_count}</div>
        <div class="l" style="font-size:var(--fs-name);">${t('active_transactions')}</div>
      </div>
      <div class="stat danger" style="padding:22px;">
        <div class="n num" style="font-size:var(--fs-total-lg);">${s.pending_count}</div>
        <div class="l" style="font-size:var(--fs-name);">${t('pending_transactions')}</div>
      </div>
    `;
  }catch(e){
    statsEl.innerHTML = `<div class="alert danger" style="grid-column:1/-1;">${e.message}</div>`;
    toast(e.message);
  }
}
