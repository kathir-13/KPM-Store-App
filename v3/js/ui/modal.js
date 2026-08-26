export function openModal(html, center=false){
  const root = document.getElementById('modalRoot');
  root.innerHTML = `<div class="modal-backdrop ${center?'center':''}" id="modalBackdrop"><div class="modal-sheet">${html}</div></div>`;
  document.getElementById('modalBackdrop').addEventListener('click', (e)=>{
    if(e.target.id === 'modalBackdrop') closeModal();
  });
}
export function closeModal(){
  document.getElementById('modalRoot').innerHTML = '';
}
