import create from 'zustand';

import type { User } from './types';

class UserStore {
  state: User | null;

  setUser(user: User | null) {
    this.state = user;
  }
}

export const userStore = new UserStore();

type UserState = {
  user: User | null;
  setUser(user: User | null): void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
