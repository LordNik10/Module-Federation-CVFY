import routes from 'config/routes';
import { useAuthContext } from 'features/auth/context/AuthContext';

interface ISortParams {
  orderNum: number;
}

interface IRoute {
  canHrAccess: boolean;
  canDevAccess: boolean;
}

function useActiveRoutes() {
  const hrRegex = /(hr)/i;
  const devRegex = /(dev)/i;
  const { userInfo } = useAuthContext();
  const userRole = userInfo.role;
  const filteredRoutesByRoleArr = routes
    .filter(
      (route: IRoute) =>
        (hrRegex.test(userRole) && route.canHrAccess) ||
        (devRegex.test(userRole) && route.canDevAccess),
    )
    .sort((a: ISortParams, b: ISortParams) => a.orderNum - b.orderNum);

  return [...filteredRoutesByRoleArr];
}

export default useActiveRoutes;
