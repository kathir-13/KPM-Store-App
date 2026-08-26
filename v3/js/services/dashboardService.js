import { sb } from '../supabaseClient.js';

export async function getDashboardStats(){
  const { data, error } = await sb.rpc('get_dashboard_stats');
  if(error) throw error;
  // RPC returns table(...) -> an array with one row
  return Array.isArray(data) ? data[0] : data;
}
