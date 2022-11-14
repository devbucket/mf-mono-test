import React from 'react';
import { useMatches, useLocation, useMatch } from 'react-router-dom';
import NotFound from '@link/common/components/NotFound/NotFound';

export default function NotFoundRenderer() {
  const matches = useMatches();

  console.warn({ matches });

  if (matches) {
    return null;
  }

  return (
    <NotFound />
  );
}
