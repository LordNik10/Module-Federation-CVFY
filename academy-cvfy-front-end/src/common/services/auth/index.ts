import LocalStorageService from '../localStorage';

const tokenKey = 'cvfy_token';
const tokenExpirationDateKey = 'cvfy_tokenExpirationDate';

function removeToken() {
  LocalStorageService.removeItem(tokenKey);
}

function removeTokenExpirationDate() {
  LocalStorageService.removeItem(tokenExpirationDateKey);
}

function isTokenDateExpired(date: string) {
  const timeZoneMSec = new Date().getTimezoneOffset() * 60 * 1000;
  // extrapolate expiration date into a useful format
  const parsedDate = Date.parse(date).valueOf() + -timeZoneMSec;
  return parsedDate >= Date.now();
}

const tokenService = {
  getTokenIfNotExpired() {
    if (
      this.getToken() &&
      isTokenDateExpired(this.getTokenExpirationDate() || '')
    ) {
      return this.getToken();
    }
    return null;
  },
  getToken() {
    return LocalStorageService.getItem(tokenKey);
  },
  setToken(value: string) {
    LocalStorageService.setItem(tokenKey, value);
  },
  clearToken() {
    removeToken();
    removeTokenExpirationDate();
  },
  getTokenExpirationDate() {
    return LocalStorageService.getItem(tokenExpirationDateKey);
  },
  setTokenExpirationDate(value: string) {
    LocalStorageService.setItem(tokenExpirationDateKey, value);
  },
};

export default tokenService;
