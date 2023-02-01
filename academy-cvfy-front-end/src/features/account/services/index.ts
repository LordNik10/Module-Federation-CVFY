import { SelectChangeEvent } from '@mui/material';
import React from 'react';
import CustomError from 'common/services/customError';
import {
  IAddAccountParams,
  IDeleteAccountParams,
  IHandleFormatAccountInfo,
  IHandleOnSubmitAccountForm,
  IAccountData,
  IFormattedAccountInfo,
} from './interfaces';

export const handleAddAccount = async ({
  formattedAccountInfo,
  callFetch,
  config,
  setSnackBar,
}: IAddAccountParams) => {
  if (config.apiUrls?.accountAdd) {
    try {
      await callFetch(config.apiUrls.accountAdd, {
        body: formattedAccountInfo,
        method: 'POST',
      });
      return setSnackBar({
        message: 'Account is updated successfully',
        type: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        if (error.statusCode === 409) {
          return setSnackBar({
            message: 'Username already exists',
            type: 'error',
          });
        }
        return setSnackBar({
          message: `Error in account creation`,
          type: 'error',
        });
      }
    }
  }
  return null;
};

export const handleDeleteAccount = async ({
  formattedAccountInfo,
  callFetch,
  config,
  onSuccess,
  modalClose,
  setSnackBar,
}: IDeleteAccountParams) => {
  if (config.apiUrls?.accountDelete) {
    try {
      await callFetch(config.apiUrls.accountDelete, {
        body: formattedAccountInfo.id,
        method: 'POST',
      });

      setSnackBar({ message: 'Account successfully deleted', type: 'success' });
      onSuccess();
      modalClose();
    } catch (error) {
      setSnackBar({ message: 'Error in deleting the account', type: 'error' });
      console.error(error);
    }
  }
};

export const handleUpdateAccount = async ({
  formattedAccountInfo,
  callFetch,
  config,
  setSnackBar,
}: IAddAccountParams) => {
  if (config.apiUrls?.accountUpdate) {
    try {
      await callFetch(config.apiUrls.accountUpdate, {
        body: formattedAccountInfo,
        method: 'POST',
      });
      return setSnackBar({
        message: 'Account is updated successfully',
        type: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        if (error.statusCode === 409) {
          return setSnackBar({
            message: 'Username already exists',
            type: 'error',
          });
        }

        return setSnackBar({
          message: `Error in account update`,
          type: 'error',
        });
      }
    }
  }
  return null;
};

export const handleFormatAccountInfo = ({
  accountInfo,
  dataAccount,
  capitalize,
}: IHandleFormatAccountInfo) => {
  const formattedName: string = capitalize(accountInfo.firstName.trim());
  let formattedSurname: string | string[] = accountInfo.lastName.trim();
  formattedSurname = formattedSurname.split(' ');
  if (formattedSurname.length > 1) {
    formattedSurname = `${formattedSurname[0]} ${capitalize(
      formattedSurname[1],
    )}`;
  } else {
    formattedSurname = capitalize(accountInfo.lastName.trim());
  }
  return {
    firstName: formattedName,
    lastName: formattedSurname,
    email: accountInfo.email.trim(),
    password: accountInfo.password,
    roleId: accountInfo.roleId,
    username: accountInfo.email.trim(),
    ...(dataAccount && { id: dataAccount.id }),
  };
};

export const handleInitializeAccountInfo = (
  dataAccount: IAccountData,
  setAccountInfo: (params: IFormattedAccountInfo) => any,
) => {
  if (dataAccount) {
    setAccountInfo({
      firstName: dataAccount.firstName,
      lastName: dataAccount.lastName,
      email: dataAccount.email,
      password: '',
      roleId: dataAccount.role.id,
      username: dataAccount.email,
    });
  }
};

export const handleOnSubmitAccountForm = async ({
  e,
  accountInfo,
  dataAccount,
  isUpdating,
  accountInitialState,
  setIsPasswordValid,
  handleFormatAccountInfo: handleFormatAccountInfoParam,
  handleAddAccount: handleAddAccountParam,
  handleUpdateAccount: handleUpdateAccountParam,
  setSnackBar,
  setRoleSelected,
  setAccountInfo,
  onSuccess,
  modalClose,
  callFetch,
  capitalize,
  config,
}: IHandleOnSubmitAccountForm) => {
  e.preventDefault();
  const formattedAccountInfo = handleFormatAccountInfoParam({
    accountInfo,
    dataAccount,
    capitalize,
  });
  if (
    !config.validation?.regexPassword.test(accountInfo.password) &&
    !isUpdating
  ) {
    setIsPasswordValid(false);
    return;
  }

  if (
    isUpdating &&
    accountInfo.password !== '' &&
    !config.validation?.regexPassword.test(accountInfo.password)
  ) {
    setIsPasswordValid(false);
    return;
  }
  setIsPasswordValid(true);

  try {
    if (isUpdating) {
      await handleUpdateAccountParam({
        formattedAccountInfo,
        callFetch,
        config,
        setSnackBar,
      });
    } else {
      await handleAddAccountParam({
        formattedAccountInfo,
        callFetch,
        config,
        setSnackBar,
      });
    }
    setRoleSelected('');
    onSuccess();
    if (isUpdating) {
      modalClose();
    }
    if (!isUpdating) {
      setAccountInfo(accountInitialState);
    }
  } catch (error) {
    setSnackBar({
      message: 'error',
      type: 'error',
    });
  }
};

export const handleOnChangeAccount = (
  e:
    | SelectChangeEvent<string | number | {}>
    | React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  prop: string,
  setAccountInfo: React.Dispatch<React.SetStateAction<IFormattedAccountInfo>>,
) => {
  const target = e.target as HTMLTextAreaElement;
  setAccountInfo(
    (prevValue: IFormattedAccountInfo) =>
      ({
        ...prevValue,
        [prop]: target.value,
      } as IFormattedAccountInfo),
  );
};
