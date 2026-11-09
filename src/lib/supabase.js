import { createClient } from '@supabase/supabase-js';

const sb_url = import.meta.env.VITE_SUPABASE_URL;
const sb_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(sb_url, sb_anon_key);
