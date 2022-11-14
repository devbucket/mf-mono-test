import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls the page to the top of the screen on navigation action. */
export default function NavigationScroll() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}
