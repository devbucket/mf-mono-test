import useUserStore from '../store';

export default function useLoginLogout() {
  const getUser = useUserStore((state) => state.getUser);
  const setUser = useUserStore((state) => state.setUser);

  async function login(username: string, password: string) {
    if (!username || !password) {
      throw new Error('You need to pass a user name and a password to login.');
    }

    await getUser(username, password);
  }

  function logout() {
    setUser(null);
  }

  return { login, logout };
}
