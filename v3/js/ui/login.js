import { signIn, fetchProfile } from '../services/authService.js';
import { setSession } from '../state/appState.js';
import { t } from '../i18n/i18n.js';

let onSuccess = null;

export function initLoginScreen(onLoginSuccess){
  onSuccess = onLoginSuccess;
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
}

export function renderLogin(){
  document.getElementById('loginError').style.display = 'none';
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
}

async function handleLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  errEl.style.display = 'none';

  if(!email || !password){
    errEl.textContent = 'Please enter email and password';
    errEl.style.display = 'block';
    return;
  }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = t('saving');

  try{
    const user = await signIn(email, password);
    const profile = await fetchProfile(user.id);
    if(!profile || !profile.active){
      throw new Error(t('account_inactive'));
    }
    setSession(user, profile);
    onSuccess();
  }catch(e){
    errEl.textContent = e.message || t('something_went_wrong');
    errEl.style.display = 'block';
  }finally{
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}
