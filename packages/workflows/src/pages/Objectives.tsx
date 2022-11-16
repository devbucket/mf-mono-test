import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import CircularProgress from '@mui/material/CircularProgress';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

import GQL from '../api/GetObjectives.query.graphql';

export default function Objectives() {
  const { data, loading } = useQuery(GQL.GetObjectives);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Paper sx={{ textAlign: 'center', p: 2 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!loading && data?.objectiveResults?.total === 0) {
    return null;
  }

  return (
    <Paper>
      <MenuList dense>
        {data?.objectiveResults?.results.map((objective) => (
          <MenuItem key={objective.id} onClick={() => navigate(`/objective/${objective.id}`)}>
            <ListItemText primary={objective.title} />
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}
