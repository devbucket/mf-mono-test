import React from 'react';
import { useQuery } from '@apollo/client';

import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import createGraphQLClient from '@link/common/graphql/createGraphQLClient';

import GQL from '../../api/GetSWPerson.query.graphql';

const client = createGraphQLClient('https://swapi-graphql.eskerda.vercel.app/');

export default function AnotherSharedComponent() {
  const { data, loading } = useQuery(GQL.GetSWPerson, { client, variables: { personId: 'cGVvcGxlOjE=' } });

  if (loading) {
    return (
      <Paper sx={{ textAlign: 'center', p: 2 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!loading && !data?.person) {
    return null;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" component="h1" noWrap>
        {data.person.name}
      </Typography>
      <Typography variant="body1" component="p" noWrap>
        <strong>Home World:</strong> {data.person.homeworld.name}
      </Typography>
    </Paper>
  );
}
