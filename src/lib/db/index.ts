import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export default createClient(
  import.meta.env.VITE_ENV_SUPABASE_URL,
  import.meta.env.VITE_ENV_SUPABASE_API_KEY_PUBLIC
);
