import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
// import Button from 'common/components/MUIOverride/Button/Button';
import Loader from 'common/components/Loader';
// import { useSnackBar } from 'features/snackbar/context';
// import LoginForm from 'features/auth/components/LoginForm';
import { useAuth } from 'features/auth/hooks/useAuth';
// import FirebaseLoginForm from 'features/firebase/components/FirebaseLoginForm';
import { FieldValues, useForm } from 'react-hook-form';

export interface ILocation {
  state: {
    from: {
      pathname: string;
    };
  };
}

function Login() {
  const { loginUserGoogle, loginUserEmail } = useAuth();

  // const { callFetch } = useCallFetch();

  const { register, handleSubmit } = useForm();

  const [loginInput, setLoginInput] = useState({
    usernameValue: '',
    isUsernameTouched: false,
    isValidUsername: false,
    passwordValue: '',
    isPasswordTouched: false,
    isValidPassword: false,
  });

  const {
    // usernameValue,
    isUsernameTouched,
    isValidUsername,
    // passwordValue,
    isPasswordTouched,
    isValidPassword,
  } = loginInput;

  const [isFormValid, setIsFormValid] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    if (isValidUsername && isValidPassword) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isValidUsername, isValidPassword]);

  // const fetchUserData = async () => {
  //   try {
  //     const user = await callFetch(config.apiUrls.me);
  //     handleUserInfo(user);
  //     tokenService.setTokenExpirationDate(user?.tokenExpirationDate);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // onSubmit function
  const onSubmit = async (data: FieldValues) => {
    setIsLoaded(false);
    if (isFormValid) {
      loginUserEmail(data.username, data.password);
      setIsLoaded(true);
    }
  };

  const onChangeUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput((prevLoginInput) => ({
      ...prevLoginInput,
      usernameValue: e.target.value,
      isUsernameTouched: true,
    }));
    const username = e.target.value;
    if (username.length > 0) {
      setLoginInput((prevLoginInput) => ({
        ...prevLoginInput,
        isValidUsername: true,
      }));
    } else {
      setLoginInput((prevLoginInput) => ({
        ...prevLoginInput,
        isValidUsername: false,
      }));
    }
  };

  const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput((prevLoginInput) => ({
      ...prevLoginInput,
      passwordValue: e.target.value,
      isPasswordTouched: true,
    }));
    const password = e.target.value;
    if (password.length > 0) {
      setLoginInput((prevLoginInput) => ({
        ...prevLoginInput,
        isValidPassword: true,
      }));
    } else {
      setLoginInput((prevLoginInput) => ({
        ...prevLoginInput,
        isValidPassword: false,
      }));
    }
  };

  const handleToggleShowPassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Card role="form" raised>
        <Box pt={2} px={5}>
          <Typography variant="h1" component="div" align="center" gutterBottom>
            Login
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Log in">
              <Stack alignItems="center" spacing={4}>
                <TextField
                  autoComplete="username"
                  placeholder="username"
                  label="Username"
                  {...register('username')}
                  onChange={onChangeUsernameHandler}
                  error={!isValidUsername && isUsernameTouched}
                  helperText={
                    !isValidUsername && isUsernameTouched
                      ? 'Please insert a valid username.'
                      : ''
                  }
                  aria-label="Your username"
                  fullWidth
                  autoFocus
                  required
                />
                <TextField
                  autoComplete="current-password"
                  placeholder="password"
                  label="Password"
                  {...register('password')}
                  type={isPasswordVisible ? 'text' : 'password'}
                  onChange={onChangePasswordHandler}
                  error={!isValidPassword && isPasswordTouched}
                  helperText={
                    !isValidPassword && isPasswordTouched
                      ? 'Please insert a valid password.'
                      : ''
                  }
                  aria-label="Your password"
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          aria-pressed={isPasswordVisible}
                          onClick={handleToggleShowPassword}
                          onMouseDown={handleToggleShowPassword}
                          edge="end"
                        >
                          {isPasswordVisible ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack flexDirection="column" alignItems="center">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!isFormValid}
                  >
                    Login
                  </Button>
                  <Typography component="span">OR</Typography>
                  <Button sx={{ margin: 0 }} onClick={loginUserGoogle}>
                    <GoogleIcon sx={{ marginRight: 1 }} /> Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Box>
      </Card>
      <Card>{/* <LoginForm /> */}</Card>
    </Box>
  );
}

export default Login;
