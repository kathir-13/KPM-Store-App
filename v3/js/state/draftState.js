/** Keeps an in-progress "New Rental" selection alive across Back navigation,
 *  stored per-device in localStorage — never sent to Supabase until Confirm.
 *  Wired up fully in Stage 4 (New Rental); the read/write contract lives here now. */
const KEY = 'kpm_rental_draft';

export function saveDraft(draft){
  try{ localStorage.setItem(KEY, JSON.stringify(draft)); }
  catch(e){ console.warn('Could not save draft', e); }
}
export function loadDraft(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
export function clearDraft(){
  localStorage.removeItem(KEY);
}
