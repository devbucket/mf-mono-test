import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GraphQLProvider from '@link/common/graphql/GraphQLProvider';

import Objectives from './pages/Objectives';

export default function App() {
  return (
    <GraphQLProvider>
      <Routes>
        <Route path="objectives" element={<Objectives />} />
      </Routes>
    </GraphQLProvider>
  );
}
