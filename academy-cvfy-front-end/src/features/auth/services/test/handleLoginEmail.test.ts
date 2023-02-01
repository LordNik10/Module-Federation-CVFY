import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { handleLoginEmail } from '../index';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const getAuthInstance = jest.fn().mockImplementation(() => ({
  auth: {},
}));

const { auth } = getAuthInstance();
const handleLogin = jest.fn();
const handleUserInfo = jest.fn();
const handleCheckUserExistAndLogin = jest.fn();
const setSnackBar = jest.fn();
const getUserDocs = jest.fn();
const setItem = jest.fn();
const signInWithUidReturned = 'uid';
const token = undefined;
const setToken = jest.fn();
const setTokenExpirationDate = jest.fn();

const baseParams = {
  email: 'sample@email.com',
  password: 'samplepassword',
  auth,
  setToken,
  setTokenExpirationDate,
  handleLogin,
  handleUserInfo,
  handleCheckUserExistAndLogin,
  setSnackBar,
  getUserDocs,
  setItem,
};

test('handleLoginEmail success', async () => {
  const signInWithEmailAndPassword = jest.fn().mockImplementation(() => {
    Promise.resolve();
    return {
      user: {
        getIdToken: jest.fn(),
        uid: 'uid',
      },
    };
  });

  const navigate = useNavigate();

  const params = {
    ...baseParams,
    signInWithEmailAndPassword,
    navigate,
  };
  await handleLoginEmail(params);

  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
    auth,
    params.email,
    params.password,
  );
  expect(params.handleCheckUserExistAndLogin).toHaveBeenCalledWith({
    getUserDocs,
    signInWithUidReturned,
    handleLogin,
    handleUserInfo,
    navigate,
    token,
    setToken,
    setTokenExpirationDate,
    setItem,
  });
});

test('handleLogin error 400', async () => {
  const signInWithEmailAndPassword = jest.fn().mockImplementation(() => {
    throw new FirebaseError('400', 'test');
  });
  const navigate = useNavigate();

  const params = {
    ...baseParams,
    signInWithEmailAndPassword,
    handleUserInfo: jest.fn(),
    handleLogin,
    navigate,
    getUserDocs,
  };

  await handleLoginEmail(params);
  await new Promise(process.nextTick);

  expect(signInWithEmailAndPassword).toThrowError('test');
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'Sorry, username or password is incorrect.',
    type: 'error',
  });
});

test('handleLogin error', async () => {
  const signInWithEmailAndPassword = jest.fn().mockImplementation(() => {
    throw new FirebaseError('404', 'test');
  });
  const navigate = useNavigate();

  const params = {
    ...baseParams,
    signInWithEmailAndPassword,
    handleUserInfo: jest.fn(),
    handleLogin,
    navigate,
  };
  await handleLoginEmail(params);

  expect(signInWithEmailAndPassword).toThrowError();
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'An error has occurred. Try again later',
    type: 'error',
  });
});
