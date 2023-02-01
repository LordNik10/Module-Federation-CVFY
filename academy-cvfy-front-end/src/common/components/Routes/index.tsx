import React from 'react';
import { Routes as RoutesRRD, Route } from 'react-router-dom';
// import Loader from 'common/components/Loader';
import { useAuthContext } from 'features/auth/context/AuthContext';
import useActiveRoutes from 'common/hooks/useActiveRoutes';
import Dashboard from 'pages/Dashboard/Dashboard';
import NotFound from 'pages/NotFound/NotFound';
import config from 'config/config';
import Login from 'pages/Login/Login';
import { useCheckAuthContext } from 'features/auth/context/CheckAuthContext';
import Loader from '../Loader';

function Routes() {
  const { isLogged } = useAuthContext();
  const routes = useActiveRoutes();
  // const hrRegex = /(hr)/i;
  // const devRegex = /(dev)/i;
  const { isLoading } = useCheckAuthContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <RoutesRRD>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.component} />
      ))}
      {/* If you need a different home page for each role, set the proper
        // element. If not set both elements to be the same */}
      {/* {devRegex.test(role) && (
        <Route path={config.routes.home} element={<Dashboard />} />
      )} */}
      <Route
        path={isLogged ? config.routes.home : config.routes.dashboard}
        element={<Dashboard />}
      />
      <Route
        path={!isLogged ? config.routes.home : config.routes.login}
        element={<Login />}
      />
      <Route path="*" element={<NotFound />} />
    </RoutesRRD>
  );
}

export default Routes;
