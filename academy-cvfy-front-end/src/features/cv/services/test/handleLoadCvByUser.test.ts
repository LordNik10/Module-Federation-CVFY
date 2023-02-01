import { handleLoadCvByUser, ISortParams } from '..';

const setIsLoading = jest.fn();
const setCvList = jest.fn();
const setSnackBar = jest.fn();
const api = 'mockApi';
const username = 'mockUsername';

const baseParams = {
  setIsLoading,
  setCvList,
  setSnackBar,
  api,
  username,
};

test('handles loading of cv by user', async () => {
  const mockArray = [{ name: 'a' }, { name: 'b' }];
  const callFetch = jest.fn().mockImplementation(() => mockArray);

  const mockSort = jest
    .fn()
    .mockImplementation((a: ISortParams, b: ISortParams) =>
      a.name > b.name ? 1 : -1,
    );

  const params = { ...baseParams, callFetch };

  await handleLoadCvByUser(params);
  expect(setIsLoading).toBeCalledWith(true);
  expect(callFetch).toHaveBeenCalledWith(api, {
    body: username,
    method: 'POST',
  });
  expect(setCvList).toHaveBeenCalledWith(mockArray.sort(mockSort));
  expect(mockArray.sort(mockSort)).toBe(mockArray);
  expect(setIsLoading).toHaveBeenCalledWith(false);
});

test('handles loading of cv by user mocksort = -1', async () => {
  const mockArray = [{ name: 'c' }, { name: 'b' }];
  const callFetch = jest.fn().mockImplementation(() => mockArray);

  const mockSort = jest
    .fn()
    .mockImplementation((a: ISortParams, b: ISortParams) =>
      a.name > b.name ? 1 : -1,
    );

  const params = { ...baseParams, callFetch };

  await handleLoadCvByUser(params);
  expect(setIsLoading).toBeCalledWith(true);
  expect(callFetch).toHaveBeenCalledWith(api, {
    body: username,
    method: 'POST',
  });
  expect(setCvList).toHaveBeenCalledWith(mockArray.sort(mockSort));
  expect(mockArray.sort(mockSort)).toStrictEqual([
    { name: 'b' },
    { name: 'c' },
  ]);
  expect(setIsLoading).toHaveBeenCalledWith(false);
});

test('handles loading of cv by user error', () => {
  const callFetch = jest.fn().mockImplementation(() => {
    throw new Error();
  });

  const params = { ...baseParams, callFetch };

  handleLoadCvByUser(params);
  expect(setIsLoading).toBeCalledWith(true);
  expect(callFetch).toHaveBeenCalledWith(api, {
    body: username,
    method: 'POST',
  });
  expect(setIsLoading).toHaveBeenCalledWith(false);
  expect(setSnackBar).toHaveBeenCalledWith({
    message: 'An error has occurred while fetching CV list',
    type: 'error',
  });
});
