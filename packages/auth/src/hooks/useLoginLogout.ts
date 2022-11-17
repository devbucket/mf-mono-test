import useUserStore from '../store';

export default function useLoginLogout() {
  const loginUser = useUserStore((state) => state.loginUser);
  const setUser = useUserStore((state) => state.setUser);

  async function login(username: string, password: string) {
    if (!username || !password) {
      throw new Error('You need to pass a user name and a password to login.');
    }

    await loginUser(username, password);
  }

  function logout() {
    setUser(null);
  }

  return { login, logout };
}
