import { useState } from 'react';
import { useAuthContext } from 'features/auth/context/AuthContext';
import { useSnackBar } from 'features/snackbar/context';
import { useCallFetch } from 'common/hooks/useFetch';
import { handleFetchDataTable, handleLoadCvByUser } from '../../services';

export interface IFetchOptions {
  method: string;
  body: { [key: string]: number };
}

export const useCvByUser = () => {
  const { callFetch } = useCallFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [cvList, setCvList] = useState([]);
  const { setSnackBar } = useSnackBar();
  const { userInfo } = useAuthContext();
  const { username } = userInfo;
  const [cv, setCv] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    rowsPerPage: 10,
    totalRows: 0,
  });

  const loadCvByUser = (api: string) =>
    handleLoadCvByUser({
      setIsLoading,
      setCvList,
      setSnackBar,
      callFetch,
      api,
      username,
    });

  const fetchDataTable = (api: string, fetchOptions: IFetchOptions) =>
    handleFetchDataTable({
      api,
      fetchOptions,
      setIsLoading,
      callFetch,
      setCv,
      setPagination,
      setSnackBar,
    });

  return {
    loadCvByUser,
    fetchDataTable,
    cvList,
    isLoading,
    setCvList,
    cv,
    pagination,
  };
};
