import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'features/auth/context/AuthContext';
import config from 'config/config';
import { roles } from 'config/constants';
import { useCallFetch } from '../../../../common/hooks/useFetch';

export interface IRoles {
  id: number;
  name: string;
}

export const useGetAllRoles = () => {
  const [allRoles, setAllRoles] = useState<IRoles[]>([]);
  const { userInfo } = useAuthContext();

  const { callFetch } = useCallFetch();

  const loadRoles = useCallback(async () => {
    try {
      const data = await callFetch(config.apiUrls.roles, {
        method: 'GET',
      });
      setAllRoles(data);
    } catch (error) {
      console.error(error);
    }
  }, [callFetch, setAllRoles]);

  useEffect(() => {
    if (userInfo.role === roles.hr) {
      loadRoles();
    }
  }, [loadRoles, userInfo]);

  return allRoles;
};
