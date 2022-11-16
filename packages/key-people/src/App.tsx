import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import NotFound from '@link/common/components/NotFound/NotFound';

import workflowsRoutes from 'workflows/routes';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { useTheme } from '@mui/material/styles';

import Layout from './components/Layout';
import routes from './routes';

export default function App() {
  const theme = useTheme();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        ...routes,
        ...workflowsRoutes,
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

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
