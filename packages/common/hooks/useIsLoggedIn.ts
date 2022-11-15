import { useUserStore } from '../store';

export default function useIsLoggedIn() {
  const user = useUserStore((state) => state.user);

  console.warn('useIsLoggedIn', Boolean(user));

  return Boolean(user);
}
