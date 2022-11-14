import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import SomeSharedComponent from 'workflows/SomeSharedComponent';
import AnotherSharedComponent from 'workflows/AnotherSharedComponent';

export default function Newsfeed() {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            Newsfeed 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <SomeSharedComponent />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnotherSharedComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
