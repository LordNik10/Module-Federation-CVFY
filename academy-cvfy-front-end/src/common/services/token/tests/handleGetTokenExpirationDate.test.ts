import { handleGetTokenExpirationDate, tokenExpirationDateKey } from '..';

test('gets token expiration date', () => {
  const getItem = jest.fn();

  handleGetTokenExpirationDate(getItem);

  expect(getItem).toHaveBeenCalledWith(tokenExpirationDateKey);
});
