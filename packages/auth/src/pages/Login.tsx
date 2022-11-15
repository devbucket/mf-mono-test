import React, { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

import useLoginLogout from '@link/common/hooks/useLoginLogout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useLoginLogout();

  const loginUser = useCallback(async () => {
    try {
      setLoading(true);
      await login(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [login, password, username]);

  return (
    <Container sx={{ p: 3 }} maxWidth="xs">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
        {/* Login form */}
        <TextField
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          InputProps={{
            type: 'password',
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={!username || !password}
          loading={loading}
          onClick={loginUser}
        >
          Login
        </LoadingButton>
      </Paper>
    </Container>
  );
}
