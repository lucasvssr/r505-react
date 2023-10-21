import React, { type ReactElement, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import {
  useLoginAndFetchMeQuery,
  useLoginMutation,
} from '../services/authentication';

export function LoginForm(): ReactElement {
  const [form, setForm] = useState({
    login: '',
    password: '',
    stayConnected: false,
  });

  const [login] = useLoginMutation();

  const handleInputChange = (event): void => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (event): void => {
    event.preventDefault();
    login(form)
      .unwrap()
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='given-login'
                name='login'
                required
                fullWidth
                id='login'
                label='Login'
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name='stayConnected' color='primary' />}
                label='Stay connected'
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/' variant='body2' color='secondary'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
              <Link href='/' variant='body2' color='secondary'>
                Don&apos;t have an account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
