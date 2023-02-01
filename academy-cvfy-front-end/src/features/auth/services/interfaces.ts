import { ISnackBarValue } from 'features/snackbar/context';
import { Auth, AuthProvider, UserCredential } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { UserDocs } from 'features/db/services/interfaces';
import { IHandleCheckUserExistForLogin } from 'features/user/services/interfaces';
import { IUserInfo } from 'features/auth/context/AuthContext';

interface IBaseAuthWithEmailAndPassword {
  auth: Auth;
  email: string;
  password: string;
}

export interface IHandleCreateUserEmail extends IBaseAuthWithEmailAndPassword {
  createUserWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string,
  ) => Promise<UserCredential>;
}

export interface IHandleLoginEmail extends IBaseAuthWithEmailAndPassword {
  signInWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  handleLogin: (params: boolean) => void;
  handleUserInfo: (params: IUserInfo) => void;
  handleCheckUserExistAndLogin: (params: IHandleCheckUserExistForLogin) => void;
  setItem: (key: string, value: string) => void;
  navigate: NavigateFunction;
  getUserDocs: UserDocs;
  setToken: (value: string) => void;
  setTokenExpirationDate: (value: string) => void;
  setSnackBar: (params: ISnackBarValue) => void;
}

export interface IHandleLogout {
  auth: Auth;
  signOut: (auth: Auth) => Promise<void>;
  navigate: NavigateFunction;
  handleLogin: (params: boolean) => void;
}

export interface IHandleLoginGoogle {
  signInWithPopup: (
    auth: Auth,
    authProvider: AuthProvider,
  ) => Promise<UserCredential>;
  auth: Auth;
  authProvider: AuthProvider;
  handleLogin: (params: boolean) => void;
  handleUserInfo: (params: IUserInfo) => void;
  navigate: NavigateFunction;
  getUserDocs: UserDocs;
  handleCheckUserExistAndLogin: (params: IHandleCheckUserExistForLogin) => void;
  setItem: (key: string, value: string) => void;
  setToken: (value: string) => void;
  setTokenExpirationDate: (value: string) => void;
  setSnackBar: (params: ISnackBarValue) => void;
}
