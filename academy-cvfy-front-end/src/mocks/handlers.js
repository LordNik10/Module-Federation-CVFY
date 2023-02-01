/* eslint-disable */
import Localbase from 'localbase';
import { rest } from 'msw';
import users from './users.json';

const DURATION_TOKEN_SEC = 600;

const db = new Localbase('db');

db.config.debug = false;

db.collection('skills')
  .get()
  .then((document) => {
    if (document.length === 0) {
      db.collection('skills').set([
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'javascript' },
        { id: 4, name: 'typescript' },
        { id: 5, name: 'Vue' },
        { id: 6, name: 'Angular' },
        { id: 7, name: 'C#' },
      ]);
    }
  });

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    if (
      !Object.hasOwn(users, req.body.username) ||
      users[req.body.username].password !== req.body.password
    ) {
      return res(ctx.delay(), ctx.status(401));
    }
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        username: req.body.username,
        role: users[req.body.username].role,
        token: `${btoa(users[req.body.username].username)}.${btoa(
          Date.now() + DURATION_TOKEN_SEC * 1000,
        )}`,
      }),
    );
  }),
  rest.get('/logout', (req, res, ctx) => {
    const user = atob(req.headers.headers.token.split('.')[0]);
    const expTime = atob(req.headers.headers.token.split('.')[1]);
    if (!Object.hasOwn(users, user) || Date.now() > expTime) {
      return res(ctx.delay(), ctx.status(401));
    }
    return res(ctx.delay(), ctx.status(200), ctx.json('ok'));
  }),
  rest.get('/me', (req, res, ctx) => {
    const user = atob(req.headers.headers.token.split('.')[0]);
    const expTime = atob(req.headers.headers.token.split('.')[1]);
    if (!Object.hasOwn(users, user) || Date.now() > expTime) {
      return res(ctx.delay(), ctx.status(401));
    }
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        firstname: users[user].firstname,
        lastname: users[user].lastname,
        role: users[user].role,
        token: req.headers.headers.token,
        token_expiration: expTime,
      }),
    );
  }),
  rest.get('/curriculum-status', (req, res, ctx) => {
    const user = atob(req.headers.headers.token.split('.')[0]);
    const expTime = atob(req.headers.headers.token.split('.')[1]);
    if (!Object.hasOwn(users, user) || Date.now() > expTime) {
      return res(ctx.delay(), ctx.status(401));
    }
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'assigned' },
        { id: 2, name: 'passed' },
        { id: 3, name: 'rejected' },
        { id: 4, name: 'pending' },
      ]),
    );
  }),

  rest.get('/skills', async function (req, res, ctx) {
    const skillsList = await db
      .collection('skills')
      .get()
      .then((el) => Object.values(el));
    const user = atob(req.headers.headers.token.split('.')[0]);
    const expTime = atob(req.headers.headers.token.split('.')[1]);
    if (!Object.hasOwn(users, user) || Date.now() > expTime) {
      return res(ctx.delay(), ctx.status(401));
    }
    return res(ctx.delay(), ctx.status(200), ctx.json([...skillsList]));
  }),
  rest.post('/skills', async function (req, res, ctx) {
    const lastUsedKey = await db
      .collection('skills')
      .get()
      .then((skills) => skills.sort((a, b) => a.id - b.id).pop().id);
    const user = atob(req.headers.headers.token.split('.')[0]);
    const expTime = atob(req.headers.headers.token.split('.')[1]);
    if (!Object.hasOwn(users, user) || Date.now() > expTime) {
      return res(ctx.delay(), ctx.status(401));
    }
    async function addSkill() {
      await db.collection('skills').add({
        id: 1 + +lastUsedKey,
        name: req.body.name,
      });
    }
    addSkill();
    return res(ctx.delay(), ctx.status(200), ctx.json('ok'));
  }),

  rest.get('/status-endpoint', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'assigned',
        },
        {
          id: 2,
          name: 'passed',
        },
        {
          id: 3,
          name: 'rejected',
        },
        {
          id: 4,
          name: 'pending',
        },
      ]),
    ),
  ),
  rest.get('/skills', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'html',
        },
        {
          id: 2,
          name: 'css',
        },
        {
          id: 3,
          name: 'javascript',
        },
        {
          id: 4,
          name: 'java',
        },
        {
          id: 5,
          name: 'react',
        },
        {
          id: 6,
          name: 'angular',
        },
        {
          id: 7,
          name: 'spring',
        },
        {
          id: 8,
          name: 'python',
        },
      ]),
    ),
  ),
  rest.get('/curriculum', (req, res, ctx) =>
    res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Niccolò',
          surname: 'Naso',
          file: 'http://localhost:3000/esempio_PDF.pdf',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'assigned',
          skills: [
            {
              id: 1,
              name: 'html',
            },
            {
              id: 2,
              name: 'css',
            },
            {
              id: 3,
              name: 'javascript',
            },
          ],
          account: {
            name: 'Mario',
            surname: 'Rossi',
            role: 'HR',
          },
        },
        {
          id: 2,
          name: 'Marika',
          surname: 'Fabiani',
          file: '../../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'passed',
          skills: [
            {
              id: 1,
              name: 'html',
            },
            {
              id: 2,
              name: 'css',
            },
            {
              id: 3,
              name: 'javascript',
            },
            {
              id: 5,
              name: 'react',
            },
          ],
          account: {
            name: 'Giacomo',
            surname: 'Alberti',
            role: 'HR',
          },
        },
        {
          id: 3,
          name: 'Gianluca',
          surname: 'La Rosa',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 1,
              name: 'html',
            },
            {
              id: 2,
              name: 'css',
            },
            {
              id: 4,
              name: 'java',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 4,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 5,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'rejected',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 6,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 7,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 8,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 9,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 10,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 11,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 12,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 13,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 14,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 15,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 16,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 17,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
        {
          id: 18,
          name: 'Daniel',
          surname: 'Zotti',
          file: '../assets/images/esempiocv.jpg',
          uploadData: '2022-07-15T10:37:31.607811',
          status: 'pending',
          skills: [
            {
              id: 7,
              name: 'spring',
            },
            {
              id: 8,
              name: 'python',
            },
          ],
          account: {
            name: 'Matteo',
            surname: 'Balestri',
            role: 'DEV',
          },
        },
      ]),
    ),
  ),

  rest.delete('/skills', (req, res, ctx) => {
    const user = atob(req.headers.headers.token.split('.')[0]);
    const expTime = atob(req.headers.headers.token.split('.')[1]);
    if (!Object.hasOwn(users, user) || Date.now() > expTime) {
      return res(ctx.delay(), ctx.status(401));
    }
    db.collection('skills').doc({ id: req.body.id }).delete();
    return res(ctx.delay(), ctx.status(200), ctx.json('ok'));
  }),

  rest.get('/roles', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 0,
          name: 'hr',
        },
        {
          id: 1,
          name: 'dev',
        },
      ]),
    ),
  ),
  rest.post('/account/add', (req, res, ctx) => {
    // if (
    //   !Object.hasOwn(users, req.body.username) ||
    //   users[req.body.username].password !== req.body.password
    // ) {
    //   return res(ctx.delay(), ctx.status(401));
    // }
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        firstName: req.body.name,
        lastName: req.body.surname,
        username: req.body.username,
        email: req.body.username,
        password: req.body.password,
        roleId: req.body.role,
      }),
    );
  }),
  rest.get('/account', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 0,
          username: 'alfonso.bianchini@bitrock.it',
          firstName: 'Alfonso',
          lastName: 'Bianchini',
          email: 'alfonso.bianchini@bitrock.it',
          role: {
            id: 0,
            name: 'hr',
          },
          lastLogin: Date.now(),
        },
        {
          id: 1,
          username: 'alfonso.calogero@bitrock.it',
          firstName: 'Alfonso',
          lastName: 'Calogero',
          email: 'alfonso.calogero@bitrock.it',
          role: {
            id: 1,
            name: 'dev',
          },
          lastLogin: Date.now(),
        },
        {
          id: 2,
          username: 'antonio.blanco@bitrock.it',
          firstName: 'Antonio',
          lastName: 'Blanco',
          email: 'antonio.blanco@bitrock.it',
          role: {
            id: 0,
            name: 'hr',
          },
          lastLogin: Date.now(),
        },
        {
          id: 3,
          username: 'andrea.parigini@bitrock.it',
          firstName: 'Andrea',
          lastName: 'Parigini',
          email: 'andrea.parigini@bitrock.it',
          role: {
            id: 0,
            name: 'hr',
          },
          lastLogin: Date.now(),
        },
      ]),
    ),
  ),

  rest.post('/account/update', (req, res, ctx) => {
    // if (
    //   !Object.hasOwn(users, req.body.username) ||
    //   users[req.body.username].password !== req.body.password
    // ) {
    //   return res(ctx.delay(), ctx.status(401));
    // }
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId,
      }),
    );
  }),
];
