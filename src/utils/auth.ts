import db from '@lib/db';

export const getIsLoggedIn = async () => {
  const authObj = JSON.parse(
    sessionStorage.getItem(
      `sb-${import.meta.env.VITE_ENV_SUPABASE_PROJECT_ID}-auth-token`,
    ) || '{}',
  );

  if (Object.keys(authObj).length === 0) return false;

  try {
    const user = await db.auth.getUser(authObj.access_token);
    return user.data.user?.id === authObj.user.id;
  } catch (error: any) {
    throw new Error(error);
  }
};
