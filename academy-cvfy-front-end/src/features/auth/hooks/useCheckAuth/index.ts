import { useCallback } from 'react';
import { DocumentData } from 'firebase/firestore';
// import config from 'config/config';
// import { useCallFetch } from 'common/hooks/useFetch';
import { useDb } from 'features/db/hooks';
import { useToken } from 'common/hooks/useToken';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { IUserInfo, useAuthContext } from '../../context/AuthContext';

export const useCheckAuth = () => {
  const { handleLogin, handleUserInfo } = useAuthContext();
  const { getUserDocs } = useDb();
  const { getTokenExpirationDate, clearToken } = useToken();
  const { removeItem } = useLocalStorage();
  // const { callFetch } = useCallFetch();

  const fetchData = useCallback(
    async (handleLoading: (params: boolean) => void) => {
      try {
        handleLoading(true);
        const userDocs = await getUserDocs();
        const userExist = userDocs.docs.filter(
          (document: DocumentData) =>
            document.data().uid === localStorage.getItem('cvfy_uid'),
        );
        if (userExist.length !== 0) {
          const { firstName, lastName, uid, username, role } =
            userExist[0].data();
          const userInfo: IUserInfo = {
            firstName,
            lastName,
            uid,
            username,
            role,
            tokenExpirationDate: getTokenExpirationDate() ?? '',
          };
          handleLogin(true);
          handleUserInfo(userInfo);
          handleLoading(false);
          // navigate(config.routes.dashboard);
        }
      } catch (error) {
        handleLogin(false);
        clearToken();
        removeItem('cvfy_uid');
        console.error(error);
      }
    },
    // eslint-disable-next-line
    [handleLogin, handleUserInfo],
  );

  return fetchData;
};
