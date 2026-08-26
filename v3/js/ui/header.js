import { signOut } from '../services/authService.js';
import { setLang } from '../i18n/i18n.js';

/** onLogout: called after Supabase sign-out completes, so main.js can route to login.
 *  onLangChange: optional — called after language switches, so the currently
 *  visible screen (which has dynamic, non-data-i18n text) can re-render itself. */
export function initHeader({ onLogout, onLangChange }){
  document.getElementById('logoutBtn').addEventListener('click', async ()=>{
    if(!confirm('Logout?')) return;
    await signOut();
    onLogout();
  });
  document.getElementById('langEnBtn').addEventListener('click', ()=> setLang('en', onLangChange));
  document.getElementById('langTaBtn').addEventListener('click', ()=> setLang('ta', onLangChange));
}
