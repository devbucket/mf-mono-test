import React from 'react';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode
  className?: string
  size?: number
  viewBox?: string
  color?: string
  sx?: SxProps<Theme>;
}

/**
 * Renders an SVG icon.
 */
export default function Icon(props: Props) {
  const {
    children, className, size = 21, color, viewBox = '0 0 24 24', sx = {},
  } = props;

  return (
    <Box component="svg"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className || ''} icon`.trim()}
      sx={{
        fill: color || 'currentColor',
        width: '1em',
        height: '1em',
        lineHeight: 1,
        fontSize: size,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
