import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'features/auth/context/AuthContext';
import config from 'config/config';
import { useSnackBar } from 'features/snackbar/context';
import { callFetch as callFetchWrapped } from '../../services/fetch';

export const useCallFetch = () => {
  const { handleLogin } = useAuthContext();
  const navigate = useNavigate();
  const { setSnackBar } = useSnackBar();

  const callFetch = useCallback(
    async (endpoint: string, options?: { [key: string]: any }) => {
      try {
        const res = await callFetchWrapped(endpoint, options);
        if (res.headers.get('Content-Type') === null) {
          return null;
        }
        return res.json();
      } catch (error: any) {
        if (
          error.statusCode === 401 &&
          (options?.isAuth ?? config.fetchAuthDefaultValue)
        ) {
          setSnackBar({ message: 'Invalid token', type: 'error' });
          handleLogin(false);
          navigate(config.routes.login);
        }
        throw error;
      }
    },
    /* eslint-disable-next-line */
    [], // navigate not added since /me calls are performed each time the page is changed, even if the page doesn't require this action
  );
  return { callFetch };
};
