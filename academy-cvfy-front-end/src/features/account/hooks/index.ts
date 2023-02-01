import React from 'react';
import config from 'config/config';
import { useCallFetch } from 'common/hooks/useFetch';
import { useModal } from 'features/modal/context';
import { capitalize } from 'common/services/utility';
import { useSnackBar } from 'features/snackbar/context';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  handleAddAccount,
  handleDeleteAccount,
  handleUpdateAccount,
  handleFormatAccountInfo,
  handleInitializeAccountInfo,
  handleOnSubmitAccountForm,
  handleOnChangeAccount,
} from '../services';
import { AccountMethods } from '../type';
import {
  IAccountData,
  IOnSubmitAccountForm,
  IFormattedAccountInfo,
} from '../services/interfaces';

export const useAccount = () => {
  const { callFetch } = useCallFetch();
  const { modalClose } = useModal();
  const { setSnackBar } = useSnackBar();

  // dummy functions inizio
  // dummy functions fine

  const accountMethodFunction = (
    type: AccountMethods,
    onSuccess: () => void,
    formattedAccountInfo: IAccountData,
  ) => {
    switch (type) {
      case AccountMethods.Add:
        return handleAddAccount({
          formattedAccountInfo,
          callFetch,
          config,
          setSnackBar,
        });
      case AccountMethods.Delete:
        return handleDeleteAccount({
          formattedAccountInfo,
          callFetch,
          modalClose,
          onSuccess,
          setSnackBar,
          config,
        });
      case AccountMethods.Update:
        return handleUpdateAccount({
          formattedAccountInfo,
          callFetch,
          config,
          setSnackBar,
        });
      default:
        return () => {};
    }
  };

  const formatAccountInfo = (
    accountInfo: IFormattedAccountInfo,
    dataAccount: IAccountData,
  ) =>
    handleFormatAccountInfo({
      accountInfo,
      dataAccount,
      capitalize,
    });

  const initializeAccountInfo = (
    dataAccount: IAccountData,
    setAccountInfo: React.Dispatch<React.SetStateAction<IFormattedAccountInfo>>,
  ) => {
    // setAccountInfo sara preso da un altro hook o context
    handleInitializeAccountInfo(dataAccount, setAccountInfo);
  };

  const onSubmitAccountForm = ({
    e,
    accountInfo,
    dataAccount,
    accountInitialState,
    setIsPasswordValid,
    setRoleSelected,
    onSuccess,
    setAccountInfo,
    isUpdating,
  }: IOnSubmitAccountForm) => {
    handleOnSubmitAccountForm({
      e,
      accountInfo,
      dataAccount,
      accountInitialState,
      isUpdating,
      setIsPasswordValid,
      handleFormatAccountInfo,
      handleAddAccount,
      handleUpdateAccount,
      setSnackBar,
      setRoleSelected,
      setAccountInfo,
      onSuccess,
      modalClose,
      callFetch,
      capitalize,
      config,
    });
  };

  const onChangeAccount = (
    e:
      | SelectChangeEvent<string | number | {}>
      | React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string,
    setAccountInfo: React.Dispatch<React.SetStateAction<IFormattedAccountInfo>>,
  ) => {
    handleOnChangeAccount(e, prop, setAccountInfo);
  };

  return {
    accountMethodFunction,
    formatAccountInfo,
    initializeAccountInfo,
    onSubmitAccountForm,
    onChangeAccount,
  };
};
