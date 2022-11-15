import { useCallback } from 'react';
import getUser from '../graphql/getUser';
import { useUserStore } from '../store';

const { setUser } = useUserStore.getState();

export default function useLoginLogout() {
  const login = useCallback((username: string, password: string) => {
    if (!username || !password) {
      throw new Error('You need to pass a user name and a password to login.');
    }

    return getUser(username, password)
      .then((user) => {
        console.warn('useLoginLogout', { user });
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return { login, logout };
}
