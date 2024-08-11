export const getIsLoggedIn = () =>
  JSON.parse(
    sessionStorage.getItem(
      `sb-${import.meta.env.VITE_ENV_SUPABASE_PROJECT_ID}-auth-token`,
    ) || 'false',
  );
