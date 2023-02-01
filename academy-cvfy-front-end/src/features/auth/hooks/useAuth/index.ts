import { useAuthContext } from 'features/auth/context/AuthContext';
import { useSnackBar } from 'features/snackbar/context';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDb } from 'features/db/hooks';
import { handleCheckUserExistAndLogin } from 'features/user/services';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { useToken } from 'common/hooks/useToken';
import {
  getAuthInstance,
  handleCreateUserEmail,
  handleLoginEmail,
  handleLogout,
  handleLoginGoogle,
} from '../../services';

export const useAuth = () => {
  const { auth, authProvider } = getAuthInstance();
  const { getUserDocs } = useDb();
  const { handleLogin, handleUserInfo } = useAuthContext();
  const { setSnackBar } = useSnackBar();
  const { setItem } = useLocalStorage();
  const { setToken, setTokenExpirationDate } = useToken();
  const navigate = useNavigate();

  const createUserEmail = (email: string, password: string) =>
    handleCreateUserEmail({
      auth,
      email,
      password,
      createUserWithEmailAndPassword,
    });

  const loginUserEmail = (email: string, password: string) =>
    handleLoginEmail({
      auth,
      email,
      password,
      setToken,
      setTokenExpirationDate,
      signInWithEmailAndPassword,
      handleLogin,
      handleUserInfo,
      handleCheckUserExistAndLogin,
      setItem,
      navigate,
      getUserDocs,
      setSnackBar,
    });

  const logoutUser = () =>
    handleLogout({ auth, signOut, navigate, handleLogin });

  const loginUserGoogle = () => {
    handleLoginGoogle({
      signInWithPopup,
      auth,
      authProvider,
      handleLogin,
      handleUserInfo,
      navigate,
      getUserDocs,
      handleCheckUserExistAndLogin,
      setItem,
      setToken,
      setTokenExpirationDate,
      setSnackBar,
    });
  };

  return { createUserEmail, loginUserEmail, logoutUser, loginUserGoogle };
};
