import useUserStore from '../store';
import type { User } from '../types';

type UseUser = [
  User | null,
  (user: User | null) => void,
]

export default function useUser(): UseUser {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return [user, setUser];
}
