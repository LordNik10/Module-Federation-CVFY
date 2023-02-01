import { handleFetchDataTable } from '..';

const setIsLoading = jest.fn();
const setCv = jest.fn();
const setPagination = jest.fn();
const setSnackBar = jest.fn();
const api = 'mockApi';
const fetchOptions = { body: 'sample body', method: 'GET' };

const baseParams = {
  api,
  fetchOptions,
  setIsLoading,
  setCv,
  setPagination,
  setSnackBar,
};

test('handles fetching of data table', async () => {
  const callFetch = jest.fn().mockImplementation(() => Promise.resolve());

  const params = { ...baseParams, callFetch };

  await handleFetchDataTable(params);
  expect(setIsLoading).toBeCalledWith(true);
  expect(callFetch).toHaveBeenCalledWith(api, fetchOptions);
  expect(setCv).toHaveBeenCalledWith(undefined);
});

test('handles fetching of data table error', async () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new Error();
  });

  const params = { ...baseParams, callFetch };

  await handleFetchDataTable(params);
  expect(setIsLoading).toBeCalledWith(true);
  expect(callFetch).toHaveBeenCalledWith(api, fetchOptions);
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'An error has occurred while fetching CV list',
    type: 'error',
  });
});
