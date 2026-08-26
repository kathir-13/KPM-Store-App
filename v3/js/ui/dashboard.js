import { getDashboardStats } from '../services/dashboardService.js';
import { t } from '../i18n/i18n.js';
import { money } from '../utils/money.js';
import { navigate } from './router.js';
import { getProfile } from '../state/appState.js';
import { toast } from './toast.js';

export function renderDashboardTiles(){
  const isAdmin = getProfile()?.role === 'admin';
  document.getElementById('dashTiles').innerHTML = `
    <button class="tile primary" onclick="window.kpmNav('new-rental')"><span class="ic">➕</span><span class="lbl">New Rental</span></button>
    <button class="tile" onclick="window.kpmNav('active-rentals')"><span class="ic">📦</span><span class="lbl">Active Rentals</span></button>
    <button class="tile" onclick="window.kpmNav('edit-rental')"><span class="ic">✏️</span><span class="lbl">Edit Active Rental</span></button>
    <button class="tile" onclick="window.kpmNav('returns')"><span class="ic">↩️</span><span class="lbl">Return Items</span></button>
    <button class="tile" onclick="window.kpmNav('payments')"><span class="ic">💰</span><span class="lbl">Payments</span></button>
    <button class="tile" onclick="window.kpmNav('items')"><span class="ic">🍽️</span><span class="lbl">Manage Items</span></button>
    <button class="tile" onclick="window.kpmNav('transactions')"><span class="ic">📜</span><span class="lbl">All Transactions</span></button>
    <button class="tile" onclick="window.kpmNav('reports')"><span class="ic">📊</span><span class="lbl">Reports</span></button>
    ${isAdmin ? `<button class="tile" onclick="window.kpmNav('users')"><span class="ic">👤</span><span class="lbl">User Management</span></button>` : ''}
    <button class="tile" onclick="window.kpmNav('settings')"><span class="ic">⚙️</span><span class="lbl">Settings</span></button>
  `;
}

export async function renderDashboard(){
  renderDashboardTiles();
  const statsEl = document.getElementById('dashStats');
  statsEl.innerHTML = `<div class="skeleton" style="grid-column:1/-1;"></div>`;
  try{
    const s = await getDashboardStats();
    statsEl.innerHTML = `
      <div class="stat warn">
        <div class="n num">${s.active_count}</div>
        <div class="l">${t('active_transactions')}</div>
      </div>
      <div class="stat danger">
        <div class="n num">${s.pending_count}</div>
        <div class="l">${t('pending_transactions')}</div>
      </div>
      <div class="stat">
        <div class="n num">${s.pending_items}</div>
        <div class="l">${t('pending_items')}</div>
      </div>
      <div class="stat success">
        <div class="n num">${money(s.today_collection)}</div>
        <div class="l">${t('today_collection')}</div>
      </div>
      <div class="stat" style="grid-column:1/-1;">
        <div class="n num">${money(s.outstanding_amount)}</div>
        <div class="l">${t('outstanding_amount')}</div>
      </div>
    `;
  }catch(e){
    statsEl.innerHTML = `<div class="alert danger" style="grid-column:1/-1;">${e.message}</div>`;
    toast(e.message);
  }
}
