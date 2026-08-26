/** Minimal screen router. Each screen is a <div class="screen" id="screen-<name>">
 *  already present in index.html; render functions are registered here and
 *  called on navigation. No URL/hash routing — matches the existing app's
 *  pattern and avoids GitHub Pages subpath issues entirely. */

const registry = {};          // name -> { render, title, inNav }
let navStack = [];
let current = null;

export function registerScreen(name, { render, title, inNav = false }){
  registry[name] = { render, title, inNav };
}

export function currentScreen(){ return current; }

export function navigate(name, { push = true } = {}){
  if(!registry[name]){ console.error('Unknown screen:', name); return; }

  document.querySelectorAll('.screen').forEach(el=>{
    el.classList.toggle('active', el.id === 'screen-' + name);
  });

  const meta = registry[name];
  const titleEl = document.getElementById('screenTitle');
  if(titleEl) titleEl.textContent = meta.title || '';

  document.querySelectorAll('#bottomnav button').forEach(b=>{
    b.classList.toggle('active', b.dataset.screen === name);
  });
  const backBtn = document.getElementById('backBtn');
  if(backBtn) backBtn.style.visibility = meta.inNav ? 'hidden' : 'visible';

  const bottomnav = document.getElementById('bottomnav');
  if(bottomnav) bottomnav.style.display = current === 'login' || name === 'login' ? 'none' : 'flex';

  if(push){
    if(navStack[navStack.length - 1] !== name) navStack.push(name);
  }
  current = name;
  window.scrollTo(0, 0);
  if(typeof meta.render === 'function') meta.render();
}

export function goBack(){
  if(navStack.length > 1){
    navStack.pop();
    navigate(navStack[navStack.length - 1], { push:false });
  } else {
    navigate('dashboard', { push:false });
  }
}

export function resetStack(startScreen){
  navStack = [startScreen];
}
