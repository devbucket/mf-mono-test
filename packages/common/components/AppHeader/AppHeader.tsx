import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { i18n } from '../../i18n';
import useScrollPosition from '../../hooks/useScrollPosition';
import { appConfigCollection } from './AppHeader.config';
import type { MenuItemConfig } from './AppHeader.types';
import Menu from './Menu';

const MAX_MENU_ITEMS = 4;

type Props = {
  domain: string;
  userPermissions?: Array<string>;
  children?: ReactNode;
  menuItems?: Array<MenuItemConfig>;
  apiUrl?: string;
  loginUrl?: string;
  hideShadow?: boolean;
};

export default function AppHeader(props: Props) {
  const {
    hideShadow = true,
    domain,
    userPermissions = [],
    children = null,
    menuItems = [],
    apiUrl = 'https://api.dev.veeva.link',
    loginUrl = 'https://dev.veeva.link',
  } = props;
  const scrollY = useScrollPosition();

  const displayedMenuItems = useMemo(() => {
    if (menuItems.length >= MAX_MENU_ITEMS) {
      return menuItems?.slice(0, MAX_MENU_ITEMS);
    }

    return menuItems;
  }, [menuItems]);

  return (
    <I18nextProvider i18n={i18n}>
      <Box
        component="header"
        data-test-id="app-header"
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          background: (theme) => theme.palette.background.paper,
          transition: 'box-shadow 150ms ease',
          zIndex: '3030',
          boxShadow: scrollY > 0 ? '0 2px 4px rgba(0, 0, 0, .15)' : undefined,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: 70,
            px: 3,
          }}
        >
          {/* Logo */}
          <Box sx={{ minWidth: 160, display: 'flex', alignItems: 'center' }}>
            {appConfigCollection.filter((item) => item.domainId === domain).map(({ title, Logo, logoProps }) => (
              <Link to="/" key={title} title={title} sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Logo {...logoProps} />
              </Link>
            ))}
          </Box>
          {/** Children */}
          <Box sx={{ flexGrow: 1, px: 1.5 }}>
            {children}
          </Box>
          {/** Main Menu & AppMenu */}
          <Box
            sx={{
              pl: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexShrink: 0,
              '.mobile-search-active &': {
                width: '100%',
                pl: 1,
              },
            }}
          >
            <Menu menuItems={displayedMenuItems} />
          </Box>
        </Container>
      </Box>
    </I18nextProvider>
  );
}
