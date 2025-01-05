export const useAccountStore = () => {
  const account = useState<Account | null>('account', () => null);

  const setAccount = (data: Account) => {
    account.value = data;
  };

  const resetAccount = () => {
    account.value = null;
  };

  const isIncludeRole = (role: string) => {
    return account.value?.roles.some((item) => item.name === role);
  };

  return {
    account,
    setAccount,
    resetAccount,
    isIncludeRole,
  };
};
