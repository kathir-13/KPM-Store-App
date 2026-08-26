import { getExistingSession, fetchProfile, onAuthStateChange } from './services/authService.js';
import { setSession, clearSession } from './state/appState.js';
import { applyStaticI18n, t } from './i18n/i18n.js';
import { registerScreen, navigate, resetStack } from './ui/router.js';
import { initHeader } from './ui/header.js';
import { initLoginScreen, renderLogin } from './ui/login.js';
import { renderDashboard } from './ui/dashboard.js';
import { renderItems } from './ui/items.js';
import { renderPlaceholder } from './ui/placeholder.js';
import { initNetworkBanner } from './utils/network.js';

// Tile buttons in dashboard.js use plain inline onclick (simplest, reliable in
// a WebView) — expose navigate() as a small global bridge just for that.
window.kpmNav = (name)=> navigate(name);

function showApp(show){
  document.getElementById('topbar').style.display = show ? 'block' : 'none';
}

function goToLogin(){
  clearSession();
  showApp(false);
  navigate('login', { push:false });
}

/** Called once appState already holds a valid session+profile
 *  (set either by login.js on successful sign-in, or by init() below
 *  when restoring an existing browser session). */
function goToApp(){
  showApp(true);
  applyStaticI18n();
  resetStack('dashboard');
  navigate('dashboard', { push:false });
}

function registerAllScreens(){
  registerScreen('login', { render: renderLogin, title: '', inNav:true });

  registerScreen('dashboard', { render: renderDashboard, title: 'K.P.M', inNav:true });

  // Placeholders — each becomes a real screen in its listed stage.
  registerScreen('new-rental', { render:()=>renderPlaceholder('screen-new-rental-inner','Stage 4'), title:()=>t('new_rental'), inNav:false });
  registerScreen('active-rentals', { render:()=>renderPlaceholder('screen-active-rentals-inner','Stage 6'), title:()=>t('active_rentals'), inNav:false });
  registerScreen('edit-rental', { render:()=>renderPlaceholder('screen-edit-rental-inner','Stage 6'), title:()=>t('edit_active_rental'), inNav:false });
  registerScreen('returns', { render:()=>renderPlaceholder('screen-returns-inner','Stage 7'), title:()=>t('return_items'), inNav:false });
  registerScreen('payments', { render:()=>renderPlaceholder('screen-payments-inner','Stage 8'), title:()=>t('payments'), inNav:false });
  registerScreen('items', { render: renderItems, title:()=>t('manage_items'), inNav:false });
  registerScreen('transactions', { render:()=>renderPlaceholder('screen-transactions-inner','Stage 9'), title:()=>t('all_transactions'), inNav:false });
  registerScreen('reports', { render:()=>renderPlaceholder('screen-reports-inner','Stage 9'), title:()=>t('reports_lbl'), inNav:false });
  registerScreen('users', { render:()=>renderPlaceholder('screen-users-inner','Stage 10'), title:()=>t('user_management'), inNav:false });
  registerScreen('settings', { render:()=>renderPlaceholder('screen-settings-inner','Stage 10'), title:()=>t('settings_lbl'), inNav:false });
}

async function init(){
  initNetworkBanner();
  applyStaticI18n();
  registerAllScreens();

  initHeader({
    onLogout: goToLogin,
    onLangChange: ()=>{
      const active = document.querySelector('.screen.active');
      if(active) navigate(active.id.replace('screen-', ''), { push:false });
    }
  });
  // login.js already validated credentials and called setSession() itself —
  // by the time this fires, appState is ready and we just switch screens.
  initLoginScreen(goToApp);

  onAuthStateChange((event)=>{
    if(event === 'SIGNED_OUT') goToLogin();
  });

  const session = await getExistingSession();
  if(session){
    try{
      const profile = await fetchProfile(session.user.id);
      if(profile && profile.active){
        setSession(session.user, profile);
        goToApp();
        return;
      }
    }catch(e){ /* fall through to login */ }
  }
  goToLogin();
}

init();
