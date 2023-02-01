import { handleFormatAccountInfo } from '..';

const accountInfo = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'string',
  password: 'string',
  roleId: 0,
  username: 'string',
};

const dataAccount = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'string',
  password: 'string',
  roleId: 0,
  username: 'string',
  role: {
    id: 0,
    name: 'string',
  },
  id: 0,
};

test('handles formatting of account', () => {
  const capitalize = jest
    .fn()
    .mockImplementation(
      (param) => param.charAt(0).toUpperCase() + param.slice(1),
    );

  const params = {
    accountInfo,
    dataAccount,
    capitalize,
  };

  handleFormatAccountInfo(params);

  expect(capitalize).toHaveBeenCalledTimes(2);
  expect(handleFormatAccountInfo(params)).toStrictEqual({
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'string',
    id: 0,
    password: 'string',
    roleId: 0,
    username: 'string',
  });
});

test('handles formatting of account lastname length > 1', () => {
  const capitalize = jest
    .fn()
    .mockImplementation(
      (param) => param.charAt(0).toUpperCase() + param.slice(1),
    );

  const newAccountInfo = {
    ...accountInfo,
    lastName: 'last name',
  };

  const params = {
    accountInfo: newAccountInfo,
    dataAccount,
    capitalize,
  };

  handleFormatAccountInfo(params);

  expect(capitalize).toHaveBeenCalledTimes(2);
  expect(handleFormatAccountInfo(params)).toStrictEqual({
    firstName: 'Firstname',
    lastName: 'last Name',
    email: 'string',
    id: 0,
    password: 'string',
    roleId: 0,
    username: 'string',
  });
});
