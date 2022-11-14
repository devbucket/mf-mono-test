import React from 'react';
import { useQuery } from '@apollo/client';

import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import client from '../../client';
import GQL from '../../api/GetExpert.query.graphql';

export default function SomeSharedComponent() {
  const { data, loading } = useQuery(GQL.GetExpert, { client, variables: { profileId: '341z' } });

  if (loading) {
    return (
      <Paper sx={{ textAlign: 'center', p: 2 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!loading && !data?.expert) {
    return null;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" component="h1" noWrap>
        {data.expert.firstName} {data.expert.lastName}, {data.expert.titles.join(', ')}
      </Typography>
      <Typography variant="body1" component="p" noWrap>
        {data.expert.primaryAffiliation.name}
      </Typography>
    </Paper>
  );
}
