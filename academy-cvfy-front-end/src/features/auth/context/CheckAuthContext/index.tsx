import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCheckAuth } from 'features/auth/hooks/useCheckAuth';
import { useNavigate } from 'react-router-dom';
import config from 'config/config';
import { useToken } from 'common/hooks/useToken';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { useAuthContext } from '../AuthContext';

const CheckAuthContext = createContext({
  isLoading: false,
});

export function useCheckAuthContext() {
  return useContext(CheckAuthContext);
}

function CheckAuth({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { handleLogin } = useAuthContext();
  const [checkAuthContext, setCheckAuthContext] = useState({
    isLoading: false,
  });
  const checkAuth = useCheckAuth();
  const navigate = useNavigate();
  const { getToken, clearToken } = useToken();
  const { getItem, removeItem } = useLocalStorage();

  const handleLoading = (value: boolean) => {
    setCheckAuthContext((prevValue) => ({ ...prevValue, isLoading: value }));
  };

  useEffect(() => {
    async function fetchData() {
      if (
        Boolean(getToken()) &&
        Number(getItem('cvfy_tokenExpirationDate')) >= Date.now()
      ) {
        await checkAuth(handleLoading);
      } else {
        handleLogin(false);
        clearToken();
        removeItem('cvfy_uid');
        navigate(config.routes.home);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [checkAuth, handleLogin, navigate]);

  return (
    <CheckAuthContext.Provider value={checkAuthContext}>
      {children}
    </CheckAuthContext.Provider>
  );
}

export default CheckAuth;

CheckAuth.defaultProps = {
  children: null,
};

CheckAuth.propTypes = {
  children: PropTypes.element,
};
