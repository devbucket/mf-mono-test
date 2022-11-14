import React from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import GQL from '../api/GetObjectives.query.graphql';

export default function Objectives() {
  const { data, loading } = useQuery(GQL.GetObjectives);

  if (loading) {
    return (
      <Paper sx={{ textAlign: 'center', p: 2 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!loading || !data?.objectiveResults || data?.objectiveResults?.total === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            {data?.objectiveResults?.results.map((objective) => (
              <>
                <Typography variant="body1">
                  {objective.name}
                </Typography>
                <Divider />
              </>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
