import { handleSetToken, tokenKey } from '..';

test('handle set token', () => {
  const setItem = jest.fn();
  const value = 'sample';

  handleSetToken(value, setItem);

  expect(setItem).toHaveBeenCalledWith(tokenKey, value);
});
