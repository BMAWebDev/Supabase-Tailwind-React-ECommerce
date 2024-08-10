import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export default createClient(
  `https://${import.meta.env.VITE_ENV_SUPABASE_PROJECT_ID}.supabase.co`,
  import.meta.env.VITE_ENV_SUPABASE_API_KEY_PUBLIC,
  {
    auth: {
      storage: sessionStorage,
    },
  }
);
