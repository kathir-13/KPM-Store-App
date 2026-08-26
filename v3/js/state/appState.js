/** Single source of truth for "who is logged in right now", read by every screen. */
const state = {
  user: null,      // supabase auth user object
  profile: null,   // { id, full_name, role, active } from public.profiles
};

export function setSession(user, profile){
  state.user = user;
  state.profile = profile;
}
export function clearSession(){
  state.user = null;
  state.profile = null;
}
export function getUser(){ return state.user; }
export function getProfile(){ return state.profile; }
export function isAdmin(){ return !!state.profile && state.profile.role === 'admin'; }
export function isLoggedIn(){ return !!state.user && !!state.profile; }
