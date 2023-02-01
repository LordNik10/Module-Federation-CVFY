import React from 'react';
import { ISnackBarValue } from 'features/snackbar/context';

export interface IFormattedAccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  username: string;
}

export interface IAccountData extends IFormattedAccountInfo {
  role: {
    id: number;
    name: string;
  };
  id: number;
}

export interface IObjectAddAccount {
  body: IFormattedAccountInfo;
  method: 'POST';
}

export interface IObjectDeleteAccount {
  body: number;
  method: 'POST';
}

// export interface IConfig {
//   apiUrls: {
//     accountAdd: string;
//     accountDelete: string;
//     accountUpdate: string;
//   };
//   validation: {
//     regexPassword: RegExp;
//   };
// }

interface IConfig {
  endPointUrl?: string;
  fetchAuthDefaultValue?: boolean;
  apiUrls?: {
    login?: string;
    me?: string;
    logout?: string;
    curriculumStatus?: string;
    curriculumSearch?: string;
    curriculum?: string;
    curriculumList?: string;
    curriculumAdd?: string;
    skills?: string;
    skillsSearch?: string;
    skillAdd?: string;
    skillDelete?: string;
    skillsPaged?: string;
    roles?: string;
    accountAdd?: string;
    account?: string;
    accountUpdate?: string;
    accountDelete?: string;
  };
  routes?: {
    home?: string;
    login?: string;
    dashboard?: string;
    profile?: string;
    account?: string;
    developer?: string;
    hr?: string;
    skills?: string;
    curriculum?: string;
  };
  snackbar?: {
    position: { vertical: string; horizontal: string };
    time: number;
  };
  appBarHeight?: number;
  validation?: {
    regexPassword: RegExp;
  };
}

export interface IAddAccountParams {
  formattedAccountInfo: IFormattedAccountInfo;
  callFetch: (api: string, obj: { body: unknown; method: string }) => any;
  config: IConfig;
  setSnackBar: (params: ISnackBarValue) => void;
}

export interface IDeleteAccountParams {
  formattedAccountInfo: IAccountData;
  callFetch: (api: string, obj: { body: unknown; method: string }) => any;
  config: IConfig;
  setSnackBar: (params: ISnackBarValue) => void;
  onSuccess: () => void;
  modalClose: () => void;
}

export interface IDeleteAccount extends IAddAccountParams {
  onSuccess: () => void;
  modalClose: () => void;
  setSnackBar: (params: ISnackBarValue) => void;
}

export interface IHandleFormatAccountInfo {
  accountInfo: IFormattedAccountInfo;
  dataAccount: IAccountData;
  capitalize: (params: string) => string;
}

export interface IHandleOnSubmitAccountForm {
  e: React.FormEvent;
  accountInfo: IFormattedAccountInfo;
  dataAccount: IAccountData;
  isUpdating: boolean;
  accountInitialState: IFormattedAccountInfo;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormatAccountInfo: (
    params: IHandleFormatAccountInfo,
  ) => IFormattedAccountInfo;
  handleAddAccount: (parms: IAddAccountParams) => void;
  handleUpdateAccount: (param: IAddAccountParams) => void;
  setSnackBar: (params: ISnackBarValue) => void;
  setRoleSelected: React.Dispatch<React.SetStateAction<number | string>>;
  setAccountInfo: React.Dispatch<React.SetStateAction<IFormattedAccountInfo>>;
  onSuccess: () => void;
  modalClose: () => void;
  callFetch: (endpoint: any, options: any) => Promise<any>;
  capitalize: (param: string) => string;
  config: IConfig;
}

export interface IOnSubmitAccountForm {
  e: React.FormEvent;
  accountInfo: IFormattedAccountInfo;
  dataAccount: IAccountData;
  accountInitialState: IFormattedAccountInfo;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  setRoleSelected: React.Dispatch<React.SetStateAction<number | string>>;
  onSuccess: () => void;
  setAccountInfo: React.Dispatch<React.SetStateAction<IFormattedAccountInfo>>;
  isUpdating: boolean;
}
