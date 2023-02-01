import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError, initializeApp } from 'firebase/app';
import config from 'config/config';
import LocalStorageService from '../../../common/services/localStorage';
import { firebaseConfig } from '../config';
import {
  IHandleCreateUserEmail,
  IHandleLoginEmail,
  IHandleLogout,
  IHandleLoginGoogle,
} from './interfaces';

export type TokenService = {
  getTokenIfNotExpired: () => string | null;
  getToken: () => string | null;
  setToken: (value: string) => void;
  clearToken: () => void;
  getTokenExpirationDate: () => string | null;
  setTokenExpirationDate: (value: string) => void;
};

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

export const tokenService = {
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

// auth initialize

export const app = initializeApp(firebaseConfig);
const authProvider = new GoogleAuthProvider();

export const getAuthInstance = () => ({ auth: getAuth(app), authProvider });

// login, signup, signout

export const handleCreateUserEmail = async ({
  auth,
  createUserWithEmailAndPassword,
  email,
  password,
}: IHandleCreateUserEmail) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return;
  } catch (error) {
    console.error(error);
  }
};

export const handleLoginEmail = async ({
  auth,
  email,
  password,
  signInWithEmailAndPassword,
  handleLogin,
  handleUserInfo,
  handleCheckUserExistAndLogin,
  navigate,
  getUserDocs,
  setSnackBar,
  setItem,
  setToken,
  setTokenExpirationDate,
}: IHandleLoginEmail) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.user.getIdToken();
    const signInWithUidReturned = user.user.uid;
    handleCheckUserExistAndLogin({
      getUserDocs,
      signInWithUidReturned,
      handleLogin,
      handleUserInfo,
      navigate,
      token,
      setToken,
      setTokenExpirationDate,
      setItem,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === '400') {
        setSnackBar({
          message: 'Sorry, username or password is incorrect.',
          type: 'error',
        });
      } else {
        setSnackBar({
          message: 'An error has occurred. Try again later',
          type: 'error',
        });
      }
    }
  }
};

export const handleLogout = async ({
  auth,
  signOut,
  navigate,
  handleLogin,
}: IHandleLogout) => {
  try {
    await signOut(auth);
    handleLogin(false);
    tokenService.clearToken();
    localStorage.removeItem('cvfy_uid');
    navigate(config.routes.home);
  } catch (error) {
    console.error(error);
  }
};

export const handleLoginGoogle = async ({
  signInWithPopup,
  auth,
  // eslint-disable-next-line no-shadow
  authProvider,
  handleLogin,
  navigate,
  getUserDocs,
  handleUserInfo,
  handleCheckUserExistAndLogin,
  setToken,
  setTokenExpirationDate,
  setSnackBar,
  setItem,
}: IHandleLoginGoogle) => {
  try {
    const user = await signInWithPopup(auth, authProvider);
    const token = await user.user.getIdToken();
    const signInWithUidReturned = await user.user.uid;
    handleCheckUserExistAndLogin({
      getUserDocs,
      signInWithUidReturned,
      handleLogin,
      handleUserInfo,
      navigate,
      token,
      setToken,
      setTokenExpirationDate,
      setItem,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      setSnackBar({ message: 'problem with auth', type: 'error' });
      console.error(error);
    }
  }
};
