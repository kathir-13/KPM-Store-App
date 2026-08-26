import { t } from '../i18n/i18n.js';

export function showLoading(msg){
  const el = document.getElementById('loadingOverlay');
  el.querySelector('.msg').textContent = msg || t('loading');
  el.style.display = 'flex';
}
export function hideLoading(){
  document.getElementById('loadingOverlay').style.display = 'none';
}
