export default defineNuxtRouteMiddleware(async (to) => {
  const { account, setAccount, resetAccount } = useAccountStore();
  const { resetToken } = useTokenStore();

  if (to.query.signout) {
    resetToken();
    resetAccount();
    return;
  }

  const router = useRouter();
  const isSkipRoute = to.fullPath.includes('public') || !to.fullPath.includes('dashboard');
  const isExistPage = router.getRoutes().some((appRoute) => appRoute.path === to.path);

  if (isSkipRoute) {
    return;
  }

  if (!isExistPage) {
    return;
  }

  if (!account.value) {
    const { data } = await useFetchSecure<Account>('accounts/me');

    if (data.value) {
      setAccount(data.value);
    }
  }

  const isPathDashboard = to.fullPath.startsWith('/dashboard');
  const afterDashboard = to.fullPath.substring('/dashboard'.length);
  const isRedirectNotAccount = isPathDashboard && !account.value && afterDashboard.length > 0;
  const isRedirectWithAccount =
    isPathDashboard && account.value && (afterDashboard.length === 0 || afterDashboard === '/');

  if (isRedirectNotAccount) {
    return navigateTo('/dashboard', { redirectCode: 301 });
  }

  if (isRedirectWithAccount) {
    return navigateTo('/dashboard/home', { redirectCode: 301 });
  }
});
