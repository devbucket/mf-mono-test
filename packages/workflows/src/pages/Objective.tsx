import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import GQL from '../api/GetObjective.query.graphql';

export default function Objective() {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery(GQL.GetObjective, { variables: { id } });

  if (loading) {
    return (
      <Paper sx={{ textAlign: 'center', p: 2 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!loading && !data?.objectiveResult) {
    return null;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {data.objectiveResult.title}
      </Typography>
    </Paper>
  );
}
