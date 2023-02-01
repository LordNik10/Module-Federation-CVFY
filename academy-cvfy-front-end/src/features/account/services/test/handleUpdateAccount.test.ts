import CustomError from 'common/services/customError';
import { handleUpdateAccount } from '..';

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

const baseParams = {
  formattedAccountInfo,
  config,
  setSnackBar,
};

test('handles update account success', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleUpdateAccount(params);
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'Account is updated successfully',
    type: 'success',
  });
});

test('handles delete account fail', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new CustomError({ message: 'hello' });
  });

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleUpdateAccount(params);

  expect(setSnackBar).toHaveBeenCalledWith({
    message: `Error in account update`,
    type: 'error',
  });
});

test('handles delete account 409', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new CustomError({ message: 'hello', statusCode: 409 });
  });

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleUpdateAccount(params);

  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'Username already exists',
    type: 'error',
  });
});

test('handle update account return null', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new Error('asdf');
  });

  const params = {
    ...baseParams,
    callFetch,
  };

  expect(await handleUpdateAccount(params)).toBe(null);
});
