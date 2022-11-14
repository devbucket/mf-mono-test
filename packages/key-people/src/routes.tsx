import React from 'react';
import type { RouteObject } from 'react-router-dom';

import Newsfeed from './pages/Newsfeed';

const router: Array<RouteObject> = [
  {
    path: '/newsfeed',
    element: <Newsfeed />,
  },
  {
    path: '/network',
    element: <div>Favorites</div>,
  },
];

export default router;
