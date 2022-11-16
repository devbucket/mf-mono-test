import React from 'react';

import AnotherSharedComponent from 'workflows/AnotherSharedComponent';
import SomeSharedComponent from 'workflows/SomeSharedComponent';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Newsfeed() {
  return (
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
  );
}
