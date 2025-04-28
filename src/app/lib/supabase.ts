import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey);
