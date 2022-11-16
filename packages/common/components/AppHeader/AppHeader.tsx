import React, { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import useScrollPosition from '../../hooks/useScrollPosition';
import { i18n } from '../../i18n';

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
  onLogout: () => void;
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
    onLogout,
  } = props;
  const scrollY = useScrollPosition();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    onLogout();
    handleMenuClose();
  }, [handleMenuClose, onLogout]);

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
            <IconButton size="large" edge="end" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <MuiMenu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MuiMenu>
          </Box>
        </Container>
      </Box>
    </I18nextProvider>
  );
}
