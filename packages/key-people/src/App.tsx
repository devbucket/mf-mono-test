import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GraphQLProvider from '@link/common/graphql/GraphQLProvider';

import Newsfeed from './pages/Newsfeed';

export default function App() {
  return (
    <GraphQLProvider>
      <Routes>
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/network" element={<div>Favorites</div>} />
      </Routes>
    </GraphQLProvider>
  );
}
