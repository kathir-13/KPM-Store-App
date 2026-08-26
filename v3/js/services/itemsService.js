import { sb } from '../supabaseClient.js';

export async function fetchItems(includeInactive = false){
  const { data, error } = await sb.from('items').select('*').order('name_ta', { ascending:true, nullsFirst:false });
  if(error) throw error;
  return includeInactive ? data : data.filter(i => i.active);
}

/** Outstanding (still-rented) qty per item, across every non-completed rental. */
export async function fetchOutstandingMap(){
  const { data, error } = await sb.from('rental_items')
    .select('item_id, qty, received_qty, rentals!inner(rental_status)')
    .neq('rentals.rental_status', 'COMPLETED');
  if(error) throw error;
  const map = {};
  (data || []).forEach(li=>{
    map[li.item_id] = (map[li.item_id] || 0) + Math.max(0, li.qty - li.received_qty);
  });
  return map;
}

export function availableQty(item, outstandingMap){
  return Math.max(0, item.total_qty - (outstandingMap[item.id] || 0));
}

export async function createItem({ name, name_ta, total_qty, price, photo_url }){
  const { error } = await sb.from('items').insert({
    name: name || null, name_ta, total_qty, price, photo_url, active: true
  });
  if(error) throw error;
}

export async function updateItem(id, { name, name_ta, total_qty, price, photo_url }){
  const { error } = await sb.from('items').update({
    name: name || null, name_ta, total_qty, price, photo_url
  }).eq('id', id);
  if(error) throw error;
}

export async function setItemActive(id, active){
  const { error } = await sb.from('items').update({ active }).eq('id', id);
  if(error) throw error;
}

export async function uploadItemPhoto(blob){
  const path = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await sb.storage.from('item-photos').upload(path, blob, { contentType: 'image/jpeg' });
  if(error) throw error;
  const { data } = sb.storage.from('item-photos').getPublicUrl(path);
  return data.publicUrl;
}
