import React from 'react';
import { ISnackBarValue } from 'features/snackbar/context';

export interface ISortParams {
  name: string;
}

interface IHandleLoadCvByUser {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCvList: React.Dispatch<React.SetStateAction<never[]>>;
  callFetch: (api: string, obj?: { body: unknown; method: string }) => any;
  setSnackBar: (params: ISnackBarValue) => void;
  api: any;
  username: string;
}

interface IHandleFetchDataTable {
  api: string;
  fetchOptions: { body: unknown; method: string };
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  callFetch: (api: string, obj?: { body: unknown; method: string }) => any;
  setCv: React.Dispatch<React.SetStateAction<never[]>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      totalPages: number;
      rowsPerPage: number;
      totalRows: number;
    }>
  >;
  setSnackBar: (params: ISnackBarValue) => void;
}

export const handleLoadCvByUser = async ({
  setIsLoading,
  setCvList,
  setSnackBar,
  callFetch,
  api,
  username,
}: IHandleLoadCvByUser) => {
  setIsLoading(true);
  try {
    const cvByUser = await callFetch(api, {
      body: username,
      method: 'POST',
    });
    setCvList(
      cvByUser.sort((a: ISortParams, b: ISortParams) =>
        a.name > b.name ? 1 : -1,
      ),
    );
  } catch (error) {
    setSnackBar({
      message: 'An error has occurred while fetching CV list',
      type: 'error',
    });
  }
  setIsLoading(false);
};

export const handleFetchDataTable = async ({
  api,
  fetchOptions,
  setIsLoading,
  callFetch,
  setCv,
  setPagination,
  setSnackBar,
}: IHandleFetchDataTable) => {
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
    setSnackBar({
      message: 'An error has occurred while fetching CV list',
      type: 'error',
    });
  }
  setIsLoading(false);
};
