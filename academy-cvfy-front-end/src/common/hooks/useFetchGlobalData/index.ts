import { useCallback, useState } from 'react';
import { capitalizeNameOfArrayObj } from 'common/services/utility';
import { useCallFetch } from '../useFetch';

export const useFetchGlobalData = () => {
  const { callFetch } = useCallFetch();
  const [data, setData] = useState<{ id: number; name: string }[]>([]);

  const fetchGlobalData = useCallback(
    async (api: string) => {
      try {
        const res = await callFetch(api);
        setData(capitalizeNameOfArrayObj(res));
      } catch (error) {
        console.error(error);
      }
    },
    [callFetch],
  );

  return { fetchGlobalData, data };
};
