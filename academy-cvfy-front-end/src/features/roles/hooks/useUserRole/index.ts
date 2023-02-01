import { useEffect, useState } from 'react';
import { useAuthContext } from 'features/auth/context/AuthContext';

function useUserRole() {
  const { isLogged, userInfo } = useAuthContext();
  const [userRole, setUserRole] = useState<string | undefined | null>('');

  useEffect(() => {
    if (isLogged) {
      setUserRole(userInfo.role);
    } else {
      setUserRole(null);
    }
  }, [isLogged, userInfo]);

  return userRole;
}

export default useUserRole;
