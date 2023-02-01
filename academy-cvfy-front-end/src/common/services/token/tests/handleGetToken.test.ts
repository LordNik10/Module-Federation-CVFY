import { handleGetToken, tokenKey } from '..';

test('handle get token', () => {
  const getItem = jest.fn();

  handleGetToken(getItem);

  expect(getItem).toHaveBeenCalledWith(tokenKey);
});
