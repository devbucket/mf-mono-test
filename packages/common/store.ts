import create from 'zustand';
import { devtools } from 'zustand/middleware';
import localStorage from 'store';
import type { User } from './types';

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialUser: User | null = localStorage.get('link:user', null);

console.warn({ initialUser });

export const useUserStore = create<UserState>(devtools((set) => ({
  user: initialUser,
  setUser: (user) => set({ user }),
}), { name: 'link:user' }));

useUserStore.subscribe((state) => {
  console.warn('subscribed', { state });
  localStorage.set('link:user', state.user);
});
