import { useCallback } from 'react';
import { useUserStore } from '../store';

export default function useUser() {
  return useUserStore((state) => state.user);
}
