export default defineNuxtRouteMiddleware(async (to) => {
  const { account, setAccount, resetAccount } = useAccountStore();
  const { resetToken } = useTokenStore();
  const router = useRouter();

  const isExistPage = router.getRoutes().some((appRoute) => appRoute.path === to.path);
  if (!isExistPage) {
    return;
  }

  if (!account.value) {
    const { data } = await useFetchSecure<Account>('accounts/me');

    if (data.value) {
      setAccount(data.value);
    }
  }

  if (to.query.signout) {
    resetToken();
    resetAccount();
  }

  if (to.path !== '/' && !account.value) {
    return navigateTo('/', { redirectCode: 301 });
  }

  if (to.path === '/' && account.value) {
    return navigateTo('home', { redirectCode: 301 });
  }
});
