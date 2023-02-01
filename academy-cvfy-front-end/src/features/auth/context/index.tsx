import PropTypes from 'prop-types';
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { tokenService } from '../services';

interface IUserInfo {
  username: string;
  role: string;
}

interface IConfigureContext {
  isLogged: boolean;
  userInfo: IUserInfo;
  handleLogin: (params: boolean) => void;
  handleUserInfo: (params: IUserInfo) => void;
  handleRole: (role: string) => void;
}

const configureContext: IConfigureContext = {
  isLogged: Boolean(tokenService.getTokenIfNotExpired()),
  userInfo: {} as IUserInfo,
  handleLogin: () => {},
  handleUserInfo: () => {},
  handleRole: () => {},
};

const AuthContext = createContext(configureContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [login, setLogin] = useState<IConfigureContext>(configureContext);

  function handleLogin(isLogged: boolean) {
    setLogin((prevValue) => ({
      ...prevValue,
      isLogged,
      userInfo: isLogged ? prevValue.userInfo : ({} as IUserInfo),
    }));
  }

  function handleUserInfo(userInfo: IUserInfo) {
    setLogin((prevValue) => ({ ...prevValue, userInfo }));
  }

  function handleRole(role: string) {
    setLogin((prevValue) => ({
      ...prevValue,
      userInfo: { role, username: prevValue.userInfo.username },
    }));
  }

  const memoizedHandleLogin = useCallback(handleLogin, []);
  const memoizedHandleUserInfo = useCallback(handleUserInfo, []);
  const memoizedHandleRole = useCallback(handleRole, []);

  const loginProviderValue = useMemo(
    () => ({
      isLogged: login?.isLogged,
      userInfo: login?.userInfo,
      handleLogin: memoizedHandleLogin,
      handleUserInfo: memoizedHandleUserInfo,
      handleRole: memoizedHandleRole,
    }),
    [login, memoizedHandleLogin, memoizedHandleUserInfo, memoizedHandleRole],
  );

  return (
    <AuthContext.Provider value={loginProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

AuthProvider.defaultProps = {
  children: null,
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};
