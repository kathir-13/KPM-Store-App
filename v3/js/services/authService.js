import { sb } from '../supabaseClient.js';

export async function getExistingSession(){
  const { data:{ session } } = await sb.auth.getSession();
  return session;
}

export async function fetchProfile(userId){
  const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
  if(error) throw error;
  return data;
}

export async function signIn(email, password){
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if(error) throw error;
  return data.user;
}

export async function signOut(){
  await sb.auth.signOut();
}

/** Registers a callback for Supabase's own auth events (e.g. session expiry
 *  triggering SIGNED_OUT elsewhere). Screens never call this directly. */
export function onAuthStateChange(callback){
  sb.auth.onAuthStateChange((event, session)=> callback(event, session));
}
