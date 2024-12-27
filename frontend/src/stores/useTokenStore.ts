export const useTokenStore = () => {
  const token = useState<string | null>('token', () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const resetToken = () => {
    token.value = null;
  };

  return {
    token,
    setToken,
    resetToken,
  };
};
