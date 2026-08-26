/** Mobile is optional app-wide (v3 change) — this only validates it IS a
 *  proper 10-digit Indian mobile number when one has actually been entered. */
export function isValidMobile(m){
  return /^[6-9]\d{9}$/.test((m || '').replace(/\D/g, ''));
}
export function hasMobile(m){
  return !!(m && m.trim().length > 0);
}
