import { handleClearToken } from '..';

test('clears token', () => {
  const removeToken = jest.fn();
  const removeTokenExpirationDate = jest.fn();
  const removeItem = jest.fn();
  const params = { removeItem, removeToken, removeTokenExpirationDate };

  handleClearToken(params);

  expect(removeToken).toHaveBeenCalledWith(removeItem);
  expect(removeTokenExpirationDate).toHaveBeenCalledWith(removeItem);
});
