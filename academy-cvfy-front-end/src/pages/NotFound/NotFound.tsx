import { Typography, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from 'features/auth/context/AuthContext';
import config from 'config/config';

function NotFound() {
  const navigate = useNavigate();
  const { isLogged } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLogged) {
        navigate(config.routes.profile);
      } else {
        navigate(config.routes.home);
      }
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Stack>
      <Typography variant="h1" align="center" color="primary">
        404
      </Typography>
      <Typography variant="h3" align="center">
        Page not found.
      </Typography>
      <Typography variant="h6" align="center">
        You are going to be redirected to the{' '}
        {isLogged ? (
          <Link to={config.routes.home}>home page</Link>
        ) : (
          <Link to={config.routes.login}>login page</Link>
        )}
        .
      </Typography>
    </Stack>
  );
}

export default NotFound;
