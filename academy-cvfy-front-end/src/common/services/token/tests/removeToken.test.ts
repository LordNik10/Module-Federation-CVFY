import { removeToken, tokenKey } from '..';

test('remove token', () => {
  const removeItem = jest.fn();

  removeToken(removeItem);
  expect(removeItem).toHaveBeenCalledWith(tokenKey);
});
