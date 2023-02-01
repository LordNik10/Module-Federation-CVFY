import { handleRemoveItem } from '..';

jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem');
Object.setPrototypeOf(window.localStorage.removeItem, jest.fn());

test('handleRemoveItem', () => {
  const key = 'key';

  handleRemoveItem(key);

  expect(localStorage.removeItem).toHaveBeenCalledWith(key);
});
