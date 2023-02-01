import { useCallback, useState } from 'react';
import { useSnackBar } from 'features/snackbar/context';
import { useCallFetch } from 'common/hooks/useFetch/index';
import { ITable } from 'features/table/components/Table/Table';

export const useCvTable = () => {
  const [cv, setCv] = useState<ITable['data']>([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    rowsPerPage: 10,
    totalRows: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackBar } = useSnackBar();
  const { callFetch } = useCallFetch();

  const fetchDataTable = useCallback(
    async (api: string, fetchOptions: { [key: string]: any }) => {
      setIsLoading(true);
      try {
        const res = await callFetch(api, fetchOptions);
        setCv(res);
        setPagination({
          totalPages: res.totalPages,
          rowsPerPage: res.pageable.pageSize,
          totalRows: res.totalElements,
        });
      } catch (error) {
        console.error(error);
        setSnackBar({
          message: 'An error has occurred while fetching CV list',
          type: 'error',
        });
      }
      setIsLoading(false);
    },
    [callFetch, setSnackBar],
  );

  return { fetchDataTable, cv, isLoading, pagination };
};
