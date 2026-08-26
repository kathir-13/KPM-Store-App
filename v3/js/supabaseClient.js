import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// window.supabase comes from the CDN <script> tag loaded in index.html
export const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
