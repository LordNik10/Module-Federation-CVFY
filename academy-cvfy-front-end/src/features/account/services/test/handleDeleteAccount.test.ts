import { handleDeleteAccount } from '..';

const formattedAccountInfo = {
  firstName: 'sample',
  lastName: 'sample',
  email: 'sample',
  password: 'sample',
  roleId: 1,
  username: 'sample',
  role: {
    id: 1,
    name: 'sample',
  },
  id: 1,
};

const config = {
  apiUrls: {
    accountAdd: 'sample',
    accountDelete: 'sample',
    accountUpdate: 'sample',
  },
  validation: {
    regexPassword: /sample/,
  },
};

const setSnackBar = jest.fn();
const modalClose = jest.fn();
const onSuccess = jest.fn();

const baseParams = {
  formattedAccountInfo,
  config,
  onSuccess,
  modalClose,
  setSnackBar,
};

test('handles delete account success', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleDeleteAccount(params);
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'Account successfully deleted',
    type: 'success',
  });

  expect(modalClose).toHaveBeenCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledTimes(1);
});

test('handles delete account fail', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.reject());

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleDeleteAccount(params);

  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'Error in deleting the account',
    type: 'error',
  });
});
