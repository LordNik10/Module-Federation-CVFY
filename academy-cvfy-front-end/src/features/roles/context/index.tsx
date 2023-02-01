import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect } from 'react';
import { useFetchGlobalData } from 'common/hooks/useFetchGlobalData';
import { useAuthContext } from 'features/auth/context/AuthContext';
// import config from 'config/config';

const RolesContext = createContext({});

export function useRoles() {
  return useContext(RolesContext);
}

function RolesProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { isLogged } = useAuthContext();
  const { fetchGlobalData: fetchRoles, data: allRoles } = useFetchGlobalData();

  useEffect(() => {
    if (isLogged) {
      // fetchRoles(config.apiUrls.roles);
      // eslint-disable-next-line
      console.log('roles');
    }
  }, [isLogged, fetchRoles]);

  return (
    <RolesContext.Provider value={allRoles}>{children}</RolesContext.Provider>
  );
}

export default RolesProvider;

RolesProvider.defaultProps = {
  children: null,
};

RolesProvider.propTypes = {
  children: PropTypes.element,
};
