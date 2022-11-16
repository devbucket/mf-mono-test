import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import type { MenuItemConfig } from './AppHeader.types';

type Props = {
  menuItems: MenuItemConfig[]
};

export default function Menu({ menuItems }: Props) {
  const { breakpoints } = useTheme();
  const { pathname } = useLocation();

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <Box component="nav" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component="ul"
        sx={{
          display: 'flex', listStyle: 'none', m: 0, p: 0,
        }}
      >
        {menuItems.map((item) => {
          if (!item.hasPermission) {
            return null;
          }

          const isActive = Boolean(pathname?.indexOf(item.path) === 0);

          return (
            <Box
              component="li"
              key={item.path}
              sx={{
                m: 0,
                display: 'block',
                px: 0.4,
              }}
            >
              <Box
                component={Link}
                to={item.path}
                sx={{
                  position: 'relative',
                  px: 1,
                  pb: 0.5,
                  transition: 'color 0.2s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: (theme) => (isActive ? theme.palette.grey[900] : theme.palette.grey[700]),
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '12px',
                  textDecoration: 'none',
                  '& .icon': {
                    opacity: isActive ? 1 : 0.75,
                  },
                  '&:hover': {
                    color: (theme) => theme.palette.grey[900],
                    textDecoration: 'none',
                    '&:before': {
                      opacity: 0.5,
                    },
                    '& .icon': {
                      opacity: 1,
                    },
                  },
                  '&:before': {
                    transition: 'opacity 0.2s ease',
                    content: '""',
                    left: 0,
                    right: 0,
                    top: '100%',
                    bottom: {
                      xs: 7,
                      md: 'initial',
                    },
                    px: {
                      xs: 0.5,
                      md: 0,
                    },
                    height: 2,
                    height: {
                      xs: 5,
                      md: 2,
                    },
                    position: 'absolute',
                    backgroundColor: (theme) => theme.palette.primary.main,
                    opacity: isActive ? 1 : 0,
                  },
                }}
                data-test-id={item.dataTestId}
              >
                {/* Icon */}
                <Box
                  component="img"
                  src={item.icon}
                  alt={item.label}
                  sx={{
                    transition: 'opacity 0.2s ease',
                    width: 16,
                    height: 16,
                    mb: 0.5,
                  }}
                  className="icon"
                />
                {/* Label */}
                <Box
                  component="span"
                  sx={{
                    whiteSpace: 'normal',
                    [breakpoints.down('md')]: {
                      width: 0,
                      height: 0,
                      padding: 0,
                      opacity: 0,
                      overflow: 'hidden',
                    },
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
