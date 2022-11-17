import fetch from 'cross-fetch';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { User } from './types';

type UserStore = {
  user: User | null;
  setUser(user: User | null): void;
  loginUser(username?: string, password?: string): Promise<User | null>;
}

/** stores and holds the user data */
const useUserStore = create<UserStore>(devtools(persist((set, get) => ({
  user: null,
  setUser(user) {
    set({ user });
  },
  async loginUser(username, password) {
    const currentUser = get().user;

    if ((!username || !password) && currentUser) {
      return currentUser;
    }

    if (!username || !password) {
      return null;
    }

    try {
      const authEndpoint = `${process.env.REACT_APP_API ?? ''}/user/obtain-auth-token/`;
      const response = await fetch(authEndpoint, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const fetchedUser: User = await response.json();
      set({ user: fetchedUser });
      return fetchedUser || null;
    } catch (error) {
      console.error(error);
      set({ user: null });
      return null;
    }
  },
}), { name: 'link:user' }), { name: 'link:user' }));

export default useUserStore;
