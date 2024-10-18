export const useAccountStore = () => {
  const account = useState<Account | null>('account', () => null);

  const setAccount = (data: Account) => {
    account.value = data;
  };

  const resetAccount = () => {
    account.value = null;
  };

  return {
    account,
    setAccount,
    resetAccount,
  };
};
