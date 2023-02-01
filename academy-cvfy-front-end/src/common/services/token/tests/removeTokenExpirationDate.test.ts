import { removeTokenExpirationDate, tokenExpirationDateKey } from '..';

test('removes token expiration date', () => {
  const removeItem = jest.fn();

  removeTokenExpirationDate(removeItem);
  expect(removeItem).toHaveBeenCalledWith(tokenExpirationDateKey);
});
