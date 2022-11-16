import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';

import client from './api/client';
import Objective from './pages/Objective';
import Objectives from './pages/Objectives';

const router: Array<RouteObject> = [
  {
    path: '/objectives',
    element: (
      <ApolloProvider client={client}>
        <Objectives />
      </ApolloProvider>
    ),
  },
  {
    path: '/objective/:id',
    element: (
      <ApolloProvider client={client}>
        <Objective />
      </ApolloProvider>
    ),
  },
];

export default router;
