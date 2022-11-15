import React, { useEffect } from 'react';
import { ScrollRestoration, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import AppHeader from '@link/common/components/AppHeader/AppHeader';
import useIsLoggedIn from '@link/common/hooks/useIsLoggedIn';
import Login from 'auth/Login';

import keyPeopleMenu from 'keypeople/menu';
import workflowsMenu from 'workflows/menu';

const menuItems: MenuItemConfig[] = [
  ...keyPeopleMenu,
  ...workflowsMenu,
];

export default function Layout() {
  const isLoggedIn = useIsLoggedIn();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.warn({ isLoggedIn });

  useEffect(() => {
    // console.warn({ isLoggedIn, pathname });
    if (isLoggedIn && pathname === '/') {
      navigate('/newsfeed');
    }
    if (!isLoggedIn && pathname !== '/') {
      navigate('/');
    }
  }, [isLoggedIn, navigate, pathname]);

  if (!isLoggedIn && pathname === '/') {
    return (
      <Login />
    );
  }

  return (
    <>
      <ScrollRestoration />
      <AppHeader domain="veeva.link" menuItems={menuItems} />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
