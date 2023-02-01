/* eslint-disable no-shadow */
// type PrintError = (key: string, error: unknown, action: unknown) => void;

export function printError(key: string, error: unknown, action: unknown) {
  console.error(`[LocalStorageService] error on ${action} ${key}: ${error}`);
}

const LocalStorageService = {
  setItem(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      printError(key, error, 'set');
    }
  },
  getItem(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      printError(key, error, 'get');
      return '';
    }
  },
  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      printError(key, error, 'remove');
    }
  },
};

export const handleSetItem = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const handleGetItem = (key: string): string =>
  String(localStorage.getItem(key));

export const handleRemoveItem = (key: string) => localStorage.removeItem(key);

export default LocalStorageService;
