import { Auth } from 'firebase/auth';
import config from 'config/config';
import { handleLogout } from '../index';

test('handleLogout', async () => {
  const signOut = jest.fn().mockImplementation(() => Promise.resolve());
  const navigate = jest.fn();
  const handleLogin = jest.fn();
  const params = {
    signOut,
    navigate,
    handleLogin,
    auth: {} as Auth,
  };

  await handleLogout(params);

  expect(signOut).toHaveBeenCalledWith(params.auth);
  expect(handleLogin).toBeCalledWith(false);
  expect(navigate).toHaveBeenCalledWith(config.routes.home);
});

test('handleLogout error', () => {
  const signOut = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  const navigate = jest.fn();
  const handleLogin = jest.fn();
  const params = {
    signOut,
    navigate,
    handleLogin,
    auth: {} as Auth,
  };

  handleLogout(params);

  expect(signOut).toThrowError();
});
