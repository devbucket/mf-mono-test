import React, { useMemo } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';

import NotFound from '@link/common/components/NotFound/NotFound';

import KeyPeople from 'keypeople/KeyPeople';
import Workflows from 'workflows/Workflows';

import Layout from './Layout';

export default function App() {
  const theme = useTheme();

  const router = createBrowserRouter((
    createRoutesFromElements((
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/*" element={(
          <>
            <KeyPeople />
            <Workflows />
          </>
        )} />
      </Route>
    ))
  ));

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*, *:before, *:after': {
            boxSizing: 'border-box',
          },
          html: {
            height: '100%',
            overflow: 'hidden', // Prevent site overscroll
          },
          body: {
            height: '100%',
            overflow: 'auto', // Prevent site overscroll
            margin: 0,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backgroundColor: theme.palette.grey[100],
            paddingTop: '70px',
          },
          '#root': {
            height: '100%',
          },
        }}
      />
      <RouterProvider router={router} />
    </StyledEngineProvider>
  );
}
