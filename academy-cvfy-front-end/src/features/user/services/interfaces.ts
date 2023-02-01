import { IUserInfo } from 'features/auth/context/AuthContext';
import { UserDocs } from 'features/db/services/interfaces';
import { NavigateFunction } from 'react-router-dom';

export interface IHandleCheckUserExistForLogin {
  getUserDocs: UserDocs;
  signInWithUidReturned: string;
  handleLogin: (param: boolean) => void;
  handleUserInfo: (param: IUserInfo) => void;
  navigate: NavigateFunction;
  setToken: (value: string) => void;
  setTokenExpirationDate: (value: string) => void;
  token: string;
  setItem: (key: string, value: string) => void;
}
