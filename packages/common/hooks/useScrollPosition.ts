import { useEffect, useCallback, useState } from 'react';

export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrollY;
}
