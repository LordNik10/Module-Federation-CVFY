import { handleGetTokenIfNotExpired } from '..';

const baseParams = {
  getToken: jest.fn(),
  getTokenExpirationDate: jest.fn(),
  getItem: jest.fn(),
};

test('handle get token if not expired success', () => {
  const isTokenDateExpired = jest.fn().mockImplementation(() => true);
  const getToken = jest.fn().mockImplementation(() => true);

  const params = { ...baseParams, isTokenDateExpired, getToken };

  handleGetTokenIfNotExpired(params);

  expect(getToken).toHaveBeenCalledWith(params.getItem);
});

test('handle get token if not expired fail', () => {
  const isTokenDateExpired = jest.fn().mockImplementation(() => false);

  const params = { ...baseParams, isTokenDateExpired };

  expect(handleGetTokenIfNotExpired(params)).toBe(null);
});
