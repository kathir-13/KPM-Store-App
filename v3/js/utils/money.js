export function money(n){
  n = Math.round(n || 0);
  return '₹' + n.toLocaleString('en-IN');
}
