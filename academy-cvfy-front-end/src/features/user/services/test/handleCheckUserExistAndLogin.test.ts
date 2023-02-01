/* eslint-disable no-console */
import config from 'config/config';
import { handleCheckUserExistAndLogin, newTokenExpirationDate } from '..';

const signInWithUidReturned = 'string';
const handleLogin = jest.fn();
const handleUserInfo = jest.fn();
const navigate = jest.fn();
const setItem = jest.fn();
const setToken = jest.fn();
const setTokenExpirationDate = jest.fn();

const baseParams = {
  signInWithUidReturned,
  handleLogin,
  handleUserInfo,
  navigate,
  token: 'token',
  setToken,
  setTokenExpirationDate,
  setItem,
};

test('handleCheckUserExsistAndLogin success', async () => {
  const getUserDocs = jest.fn().mockImplementation(() => {
    Promise.resolve();
    return {
      docs: [
        {
          data: jest.fn().mockImplementation(() => ({
            uid: 'string',
            firstName: 'a',
            lastName: 'a',
            id: 1,
            username: 'a',
            role: 'hr',
          })),
        },
      ],
    };
  });
  const params = {
    ...baseParams,
    getUserDocs,
  };

  const user = getUserDocs();
  const { firstName, lastName, username, role } = user.docs[0].data();
  const userInfo = {
    firstName,
    lastName,
    uid: 'string',
    username,
    role,
    tokenExpirationDate: newTokenExpirationDate,
  };

  await handleCheckUserExistAndLogin(params);

  expect(getUserDocs).toHaveBeenCalled();
  expect(handleLogin).toHaveBeenCalledWith(true);
  expect(setToken).toHaveBeenCalledWith(params.token);
  expect(setTokenExpirationDate).toHaveBeenCalled();
  expect(setItem).toHaveBeenCalledWith('cvfy_uid', userInfo.uid?.toString());
  expect(handleUserInfo).toHaveBeenCalledWith(userInfo);
  expect(navigate).toHaveBeenCalledWith(config.routes.home);
});

test('handleCheckUserExsistAndLogin fail', async () => {
  const getUserDocs = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  const params = {
    ...baseParams,
    getUserDocs,
  };

  await handleCheckUserExistAndLogin(params);

  expect(getUserDocs).toThrowError();
});
