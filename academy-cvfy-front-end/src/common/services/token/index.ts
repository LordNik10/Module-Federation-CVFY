/* eslint-disable no-shadow */
export const tokenKey = 'cvfy_token';
export const tokenExpirationDateKey = 'cvfy_tokenExpirationDate';

type GetFunction = (param: string) => string | null;
type SetFunction = (key: string, value: string) => void;
type RemoveFunction = (key: string) => void;
type WrappedRemoveOrGetFunction = (param: GetFunction) => string | null;
type WrappedRemoveFunction = (param: RemoveFunction) => void;

interface IHandleGetTokenIfNotExpired {
  getToken: WrappedRemoveOrGetFunction;
  getTokenExpirationDate: WrappedRemoveOrGetFunction;
  isTokenDateExpired: (param: string) => boolean;
  getItem: GetFunction;
}

interface IHandleClearToken {
  removeToken: WrappedRemoveFunction;
  removeTokenExpirationDate: WrappedRemoveFunction;
  removeItem: RemoveFunction;
}

export function removeToken(removeItem: RemoveFunction) {
  removeItem(tokenKey);
}

export function removeTokenExpirationDate(removeItem: RemoveFunction) {
  removeItem(tokenExpirationDateKey);
}

export function isTokenDateExpired(date: string) {
  const timeZoneMSec = new Date().getTimezoneOffset() * 60 * 1000;
  // extrapolate expiration date into a useful format
  const parsedDate = Date.parse(date).valueOf() + -timeZoneMSec;
  return parsedDate >= Date.now();
}

export const handleGetTokenIfNotExpired = ({
  getToken,
  getTokenExpirationDate,
  isTokenDateExpired,
  getItem,
}: IHandleGetTokenIfNotExpired) => {
  if (
    getToken(getItem) &&
    isTokenDateExpired(getTokenExpirationDate(getItem) || '')
  ) {
    getToken(getItem);
  }
  return null;
};
export const handleGetToken = (getItem: GetFunction) => getItem(tokenKey);

export const handleSetToken = (value: string, setItem: SetFunction) => {
  setItem(tokenKey, value);
};
export const handleClearToken = ({
  removeToken,
  removeTokenExpirationDate,
  removeItem,
}: IHandleClearToken) => {
  removeToken(removeItem);
  removeTokenExpirationDate(removeItem);
};
export const handleGetTokenExpirationDate = (getItem: GetFunction) =>
  getItem(tokenExpirationDateKey);

export const handleSetTokenExpirationDate = (
  value: string,
  setItem: SetFunction,
) => setItem(tokenExpirationDateKey, value);
