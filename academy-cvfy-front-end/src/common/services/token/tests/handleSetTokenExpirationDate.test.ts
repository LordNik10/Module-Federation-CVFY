import { handleSetTokenExpirationDate, tokenExpirationDateKey } from '..';

test('gets token expiration date', () => {
  const setItem = jest.fn();
  const value = 'sample';

  handleSetTokenExpirationDate(value, setItem);

  expect(setItem).toHaveBeenCalledWith(tokenExpirationDateKey, value);
});
