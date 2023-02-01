import React from 'react';
import { Button, Typography, Container, TextField } from '@mui/material';
import { useAuth } from 'features/auth/hooks/useAuth';
import { useForm } from 'react-hook-form';

function FirebaseLoginForm() {
  const { loginUserGoogle, loginUserEmail } = useAuth();
  const { register, handleSubmit } = useForm();

  return (
    <Container>
      <Container>
        <TextField
          placeholder="email"
          required
          {...register('email', { required: true })}
        />
        <TextField
          placeholder="Password"
          required
          {...register('password', { required: true })}
        />
      </Container>
      <Button
        onClick={handleSubmit(({ email, password }) =>
          loginUserEmail(email, password),
        )}
      >
        Login
      </Button>
      <Typography>or</Typography>
      <Button onClick={loginUserGoogle}>Login with Google</Button>
    </Container>
  );
}

export default FirebaseLoginForm;
