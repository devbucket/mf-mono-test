import React from 'react';
import { ScrollRestoration, Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';

import AppHeader from '@link/common/components/AppHeader/AppHeader';

import keyPeopleMenu from 'keypeople/menu';
import workflowsMenu from 'workflows/menu';

import NotFoundRenderer from './NotFoundRenderer';

const menuItems: MenuItemConfig[] = [
  ...keyPeopleMenu,
  ...workflowsMenu,
];

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <AppHeader domain="veeva.link" menuItems={menuItems} />
      <Container maxWidth="lg">
        <NotFoundRenderer />
        <Outlet />
      </Container>
    </>
  );
}
