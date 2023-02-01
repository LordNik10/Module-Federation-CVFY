import { FirebaseError } from 'firebase/app';
import { Auth, AuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { handleLoginGoogle } from '../index';

const handleLogin = jest.fn();
const handleUserInfo = jest.fn();
const handleCheckUserExistAndLogin = jest.fn();
const setSnackBar = jest.fn();
const getUserDocs = jest.fn();
const setItem = jest.fn();
const setToken = jest.fn();
const setTokenExpirationDate = jest.fn();
const signInWithUidReturned = 'uid';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const baseParams = {
  auth: {} as Auth,
  authProvider: {} as AuthProvider,
  handleLogin,
  handleUserInfo,
  handleCheckUserExistAndLogin,
  setToken,
  setTokenExpirationDate,
  setSnackBar,
  getUserDocs,
  setItem,
};

test('handleLoginGoogle', async () => {
  const signInWithPopup = jest.fn().mockImplementation(() => ({
    user: {
      getIdToken: jest.fn(),
      uid: 'uid',
    },
  }));
  const navigate = useNavigate();

  const params = {
    ...baseParams,
    handleLogin,
    handleUserInfo,
    navigate,
    signInWithPopup,
    getUserDocs,
  };
  await handleLoginGoogle(params);
  await new Promise(process.nextTick);

  expect(signInWithPopup).toHaveBeenCalledWith(
    params.auth,
    params.authProvider,
  );

  expect(handleCheckUserExistAndLogin).toHaveBeenCalledWith({
    getUserDocs,
    signInWithUidReturned,
    handleLogin,
    handleUserInfo,
    navigate,
    token: undefined,
    setToken,
    setTokenExpirationDate,
    setItem,
  });
});

test('handleLoginGoogle error', async () => {
  const signInWithPopup = jest.fn().mockImplementation(() => {
    throw new FirebaseError('404', 'test');
  });
  const navigate = useNavigate();

  const params = {
    ...baseParams,
    handleLogin,
    handleUserInfo,
    navigate,
    signInWithPopup,
    handleCheckUserExistAndLogin: jest.fn(),
  };
  await handleLoginGoogle(params);

  expect(signInWithPopup).toThrowError();
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'problem with auth',
    type: 'error',
  });
});
