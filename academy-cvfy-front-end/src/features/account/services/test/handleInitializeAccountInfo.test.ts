import { handleInitializeAccountInfo } from '..';

test('initialize account info', () => {
  const dataAccount = {
    firstName: 'string',
    lastName: 'string',
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

  const setAccountInfo = jest.fn();

  handleInitializeAccountInfo(dataAccount, setAccountInfo);

  expect(setAccountInfo).toHaveBeenCalledWith({
    email: 'string',
    firstName: 'string',
    lastName: 'string',
    password: '',
    roleId: 0,
    username: 'string',
  });
});
