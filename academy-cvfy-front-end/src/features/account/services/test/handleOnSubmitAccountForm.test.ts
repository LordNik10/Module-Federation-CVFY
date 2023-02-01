/* eslint-disable no-shadow */
import { handleOnSubmitAccountForm } from '..';

const accountInfo = {
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  password: 'string',
  roleId: 1,
  username: 'string',
  role: {
    id: 1,
    name: 'string',
  },
  id: 1,
};

const dataAccount = { ...accountInfo };

const config = {
  apiUrls: {
    accountAdd: 'string',
    accountDelete: 'string',
    accountUpdate: 'string',
  },
  validation: {
    regexPassword: /regex/,
  },
};

const e = {
  nativeEvent: 'sample native element' as any,
  currentTarget: 'sample current target' as any,
  target: 'sample target' as any,
  bubbles: false,
  cancelable: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  preventDefault: jest.fn(),
  isDefaultPrevented: jest.fn(),
  stopPropagation: jest.fn(),
  isPropagationStopped: jest.fn(),
  persist: jest.fn(),
  timeStamp: 0,
  type: 'sample type',
};

const baseParams = {
  e,
  accountInfo,
  dataAccount,
  isUpdating: false,
  accountInitialState: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string',
    roleId: 1,
    username: 'string',
  },
  setIsPasswordValid: jest.fn(),
  handleFormatAccountInfo: jest.fn(),
  handleAddAccount: jest.fn(),
  handleUpdateAccount: jest.fn(),
  setSnackBar: jest.fn(),
  setRoleSelected: jest.fn(),
  setAccountInfo: jest.fn(),
  onSuccess: jest.fn(),
  modalClose: jest.fn(),
  capitalize: jest.fn(),
  config,
};

test('handleOnSubmitAccountForm password invalid (isUpdating: false)', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = { ...baseParams, callFetch };
  const {
    accountInfo,
    dataAccount,
    handleFormatAccountInfo,
    capitalize,
    setIsPasswordValid,
  } = params;

  await handleOnSubmitAccountForm(params);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(handleFormatAccountInfo).toHaveBeenCalledWith({
    accountInfo,
    dataAccount,
    capitalize,
  });
  expect(setIsPasswordValid).toHaveBeenCalledWith(false);
});

test('handleOnSubmitAccountForm password invalid (isUpdating: true)', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = { ...baseParams, callFetch, isUpdating: true };
  const {
    accountInfo,
    dataAccount,
    handleFormatAccountInfo,
    capitalize,
    setIsPasswordValid,
  } = params;

  await handleOnSubmitAccountForm(params);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(handleFormatAccountInfo).toHaveBeenCalledWith({
    accountInfo,
    dataAccount,
    capitalize,
  });
  expect(setIsPasswordValid).toHaveBeenCalledWith(false);
});

test('handleOnSubmitAccountForm password valid (is updating = true)', async () => {
  const newAccountInfo = { ...baseParams.accountInfo, password: 'regex' };
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = {
    ...baseParams,
    callFetch,
    isUpdating: true,
    accountInfo: newAccountInfo,
  };

  const {
    accountInfo,
    dataAccount,
    handleFormatAccountInfo,
    capitalize,
    setIsPasswordValid,
    handleUpdateAccount,
    setSnackBar,
  } = params;

  await handleOnSubmitAccountForm(params);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(handleFormatAccountInfo).toHaveBeenCalledWith({
    accountInfo,
    dataAccount,
    capitalize,
  });
  expect(setIsPasswordValid).toHaveBeenCalledWith(true);
  expect(handleUpdateAccount).toHaveBeenCalledWith({
    formattedAccountInfo: undefined,
    callFetch,
    config,
    setSnackBar,
  });
});

test('handleOnSubmitAccountForm password valid (is updating = false)', async () => {
  const newAccountInfo = { ...baseParams.accountInfo, password: 'regex' };
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = { ...baseParams, callFetch, accountInfo: newAccountInfo };
  await handleOnSubmitAccountForm(params);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(params.handleFormatAccountInfo).toHaveBeenCalledWith({
    accountInfo: params.accountInfo,
    dataAccount: params.dataAccount,
    capitalize: params.capitalize,
  });
  expect(params.setIsPasswordValid).toHaveBeenCalledWith(true);
  expect(params.handleAddAccount).toHaveBeenCalledWith({
    formattedAccountInfo: undefined,
    callFetch: params.callFetch,
    config: params.config,
    setSnackBar: params.setSnackBar,
  });
});

test('handleOnSubmitAccountForm throw error', async () => {
  const newAccountInfo = { ...baseParams.accountInfo, password: 'regex' };
  const callFetch = jest.fn().mockImplementation(() => {
    throw new Error();
  });

  const params = {
    ...baseParams,
    callFetch,
    accountInfo: newAccountInfo,
    handleAddAccount: jest.fn().mockImplementation(() => {
      throw new Error();
    }),
  };
  const {
    accountInfo,
    dataAccount,
    handleFormatAccountInfo,
    capitalize,
    setIsPasswordValid,
    handleAddAccount,
    setSnackBar,
  } = params;

  await handleOnSubmitAccountForm(params);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(handleFormatAccountInfo).toHaveBeenCalledWith({
    accountInfo,
    dataAccount,
    capitalize,
  });
  expect(setIsPasswordValid).toHaveBeenCalledWith(true);
  expect(handleAddAccount).toHaveBeenCalledWith({
    formattedAccountInfo: undefined,
    callFetch,
    config,
    setSnackBar,
  });

  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'error',
    type: 'error',
  });
});
