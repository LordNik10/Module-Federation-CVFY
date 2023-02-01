import { DocumentData } from 'firebase/firestore';
import { IUserInfo } from 'features/auth/context/AuthContext';
import config from 'config/config';
import { IHandleCheckUserExistForLogin } from './interfaces';

export const newTokenExpirationDate = (Date.now() + 60000).toString();

export const handleCheckUserExistAndLogin = async ({
  getUserDocs,
  signInWithUidReturned,
  handleLogin,
  handleUserInfo,
  navigate,
  token,
  setToken,
  setTokenExpirationDate,
  setItem,
}: IHandleCheckUserExistForLogin) => {
  try {
    const userDocs = await getUserDocs();
    const userExist = userDocs.docs.filter(
      (document: DocumentData) => document.data().uid === signInWithUidReturned,
    );

    if (userExist.length !== 0) {
      const { firstName, lastName, uid, username, role } = userExist[0].data();
      const userInfo: IUserInfo = {
        firstName,
        lastName,
        uid,
        username,
        role,
        tokenExpirationDate: newTokenExpirationDate,
      };
      handleLogin(true);
      setItem('cvfy_uid', userInfo.uid.toString());

      setToken(token);
      setTokenExpirationDate(userInfo.tokenExpirationDate);
      handleUserInfo(userInfo);
      navigate(config.routes.home);
    }
  } catch (error) {
    console.error(error);
  }
};
