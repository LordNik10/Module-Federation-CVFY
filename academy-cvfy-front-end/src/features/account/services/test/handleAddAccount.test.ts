import CustomError from 'common/services/customError';
import { handleAddAccount } from '..';

const setSnackBar = jest.fn();

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

const baseParams = {
  formattedAccountInfo,
  config,
  setSnackBar,
};

test('handles add account function success', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = {
    ...baseParams,
    callFetch,
  };

  try {
    await handleAddAccount(params);
    expect(callFetch).toBeCalledWith(config.apiUrls.accountAdd, {
      body: formattedAccountInfo,
      method: 'POST',
    });
  } finally {
    expect(setSnackBar).toHaveBeenCalledWith({
      message: 'Account is updated successfully',
      type: 'success',
    });
  }
});

test('handles add account function error', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new CustomError({ message: 'hello' });
  });

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleAddAccount(params);
  expect(callFetch).toBeCalledWith(config.apiUrls.accountAdd, {
    body: formattedAccountInfo,
    method: 'POST',
  });
  expect(setSnackBar).toHaveBeenCalledWith({
    message: `Error in account creation`,
    type: 'error',
  });
});

test('handles add account function 409', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new CustomError({ message: 'hello', statusCode: 409 });
  });

  const params = {
    ...baseParams,
    callFetch,
  };

  await handleAddAccount(params);
  expect(callFetch).toBeCalledWith(config.apiUrls.accountAdd, {
    body: formattedAccountInfo,
    method: 'POST',
  });
  expect(callFetch).toThrow(CustomError);
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'Username already exists',
    type: 'error',
  });
});

test('handle add account return null', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new Error('asdf');
  });

  const params = {
    ...baseParams,
    callFetch,
  };

  expect(await handleAddAccount(params)).toBe(null);
});
