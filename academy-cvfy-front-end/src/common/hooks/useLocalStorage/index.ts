import {
  handleGetItem,
  handleSetItem,
  handleRemoveItem,
} from 'common/services/localStorage';

export const useLocalStorage = () => {
  const getItem = (key: string) => handleGetItem(key);
  const setItem = (key: string, value: string) => handleSetItem(key, value);
  const removeItem = (key: string) => handleRemoveItem(key);

  return { getItem, setItem, removeItem };
};
