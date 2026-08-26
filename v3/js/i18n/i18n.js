import en from './en.js';
import ta from './ta.js';

const DICTS = { en, ta };
let currentLang = localStorage.getItem('kpm_lang') || 'en';

export function getLang(){ return currentLang; }

export function t(key){
  return (DICTS[currentLang] && DICTS[currentLang][key]) || DICTS.en[key] || key;
}

/** Set the active language, persist it, and re-apply every [data-i18n] element on the page. */
export function setLang(lang, onChange){
  if(!DICTS[lang]) return;
  currentLang = lang;
  localStorage.setItem('kpm_lang', lang);
  applyStaticI18n();
  if(typeof onChange === 'function') onChange(lang);
}

/** Applies translations to any element carrying data-i18n="key" and updates the lang toggle's active state. */
export function applyStaticI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  const enBtn = document.getElementById('langEnBtn');
  const taBtn = document.getElementById('langTaBtn');
  if(enBtn) enBtn.classList.toggle('active', currentLang === 'en');
  if(taBtn) taBtn.classList.toggle('active', currentLang === 'ta');
}
