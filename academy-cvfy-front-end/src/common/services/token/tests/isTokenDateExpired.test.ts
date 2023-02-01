import { isTokenDateExpired } from '..';

test('is token date expired true', () => {
  isTokenDateExpired('dec 12, 2020');
});

test('is token date expired false', () => {
  isTokenDateExpired('dec 12, 2020');
});
