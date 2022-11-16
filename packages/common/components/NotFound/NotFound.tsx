import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import NotFoundGif from './notfound.gif';

export default function NotFound() {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid
          xs={10}
          xsOffset={1}
          sm={8}
          smOffset={2}
          md={6}
          mdOffset={3}
        >
          <Paper
            sx={{
              mt: {
                xs: 2,
                md: 4,
              },
              p: 2,
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              src={NotFoundGif}
              alt="Page not found"
              sx={{
                width: '100%',
                height: 'auto',
                mx: 'auto',
                mb: 1,
              }}
            />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
              Page not found
            </Typography>
            <Typography>
              Please check your URL, or
              {' '}
              <MuiLink component={Link} to="/">return home</MuiLink>
              .
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
