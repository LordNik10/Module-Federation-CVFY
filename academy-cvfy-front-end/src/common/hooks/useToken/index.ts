import {
  removeToken,
  removeTokenExpirationDate,
  isTokenDateExpired,
  handleGetTokenIfNotExpired,
  handleGetToken,
  handleSetToken,
  handleClearToken,
  handleGetTokenExpirationDate,
  handleSetTokenExpirationDate,
} from 'common/services/token';
import { useLocalStorage } from '../useLocalStorage';

export const useToken = () => {
  const { removeItem, setItem, getItem } = useLocalStorage();

  const getTokenIfNotExpired = () =>
    handleGetTokenIfNotExpired({
      getToken: handleGetToken,
      getTokenExpirationDate: handleGetTokenExpirationDate,
      isTokenDateExpired,
      getItem,
    });

  const getToken = () => handleGetToken(getItem);

  const setToken = (value: string) => handleSetToken(value, setItem);

  const clearToken = () =>
    handleClearToken({
      removeToken,
      removeTokenExpirationDate,
      removeItem,
    });

  const getTokenExpirationDate = () => handleGetTokenExpirationDate(getItem);

  const setTokenExpirationDate = (value: string) =>
    handleSetTokenExpirationDate(value, setItem);

  return {
    getTokenIfNotExpired,
    getToken,
    setToken,
    clearToken,
    getTokenExpirationDate,
    setTokenExpirationDate,
  };
};
