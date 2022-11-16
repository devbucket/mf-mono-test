import React, { useEffect } from 'react';
import {
  ScrollRestoration, Outlet, useLocation, useNavigate,
} from 'react-router-dom';

import AppHeader from '@link/common/components/AppHeader/AppHeader';
import type { MenuItemConfig } from '@link/common/components/AppHeader/AppHeader.types';
import Login from 'auth/Login';
import useLoginLogout from 'auth/useLoginLogout';
import useUser from 'auth/useUser';
import keyPeopleMenu from 'keypeople/menu';
import workflowsMenu from 'workflows/menu';

import Container from '@mui/material/Container';

const menuItems: MenuItemConfig[] = [
  ...keyPeopleMenu,
  ...workflowsMenu,
];

export default function Layout() {
  const [user] = useUser();
  const { logout } = useLoginLogout();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // console.warn({ isLoggedIn: !!user, pathname });
    if (!!user && pathname === '/') {
      navigate('/newsfeed');
    }
    if (!user && pathname !== '/') {
      navigate('/');
    }
  }, [user, pathname, navigate]);

  if (!user && pathname === '/') {
    return (
      <Login />
    );
  }

  return (
    <>
      <ScrollRestoration />
      <AppHeader domain="veeva.link" menuItems={menuItems} onLogout={logout} />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
