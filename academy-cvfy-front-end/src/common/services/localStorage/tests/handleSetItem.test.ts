import { handleSetItem } from '..';

jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

test('handleSetItem', () => {
  const key = 'key';
  const value = 'value';

  handleSetItem(key, value);

  expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
});
