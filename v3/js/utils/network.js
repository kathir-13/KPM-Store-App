import { t } from '../i18n/i18n.js';

export function initNetworkBanner(){
  const update = ()=>{
    const b = document.getElementById('offlineBanner');
    if(!navigator.onLine){ b.textContent = '⚠ ' + t('no_internet'); b.classList.add('show'); }
    else b.classList.remove('show');
  };
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}
