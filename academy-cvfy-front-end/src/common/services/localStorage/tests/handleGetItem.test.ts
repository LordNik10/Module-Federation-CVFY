import { handleGetItem } from '..';

jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
Object.setPrototypeOf(window.localStorage.getItem, jest.fn());

test('handleGetItem', () => {
  const key = 'key';

  handleGetItem(key);

  expect(localStorage.getItem).toHaveBeenCalledWith(key);
});
