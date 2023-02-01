import { Auth } from 'firebase/auth';
import { handleCreateUserEmail } from '../index';

const baseParams = {
  email: 'sample@email.com',
  password: 'samplepassword',
  auth: {} as Auth,
};

test('handleCreateUserEmail', () => {
  const createUserWithEmailAndPassword = jest
    .fn()
    .mockImplementation(() => Promise.resolve());
  const params = {
    ...baseParams,
    createUserWithEmailAndPassword,
  };

  handleCreateUserEmail(params);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
    params.auth,
    params.email,
    params.password,
  );
});

test('handleCreateUserEmail error', async () => {
  const createUserWithEmailAndPassword = jest.fn().mockImplementation(() => {
    throw new Error('hello');
  });

  const params = {
    ...baseParams,
    createUserWithEmailAndPassword,
  };

  await handleCreateUserEmail(params);
  expect(createUserWithEmailAndPassword).toThrowError();
});
