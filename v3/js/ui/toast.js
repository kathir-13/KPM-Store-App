let hideTimer = null;

export function toast(msg){
  const el = document.getElementById('toast');
  if(!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(()=> el.classList.remove('show'), 2400);
}
