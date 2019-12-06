/* eslint-disable global-require */
const request = require('supertest');
const bcrypt = require('bcrypt');
const { db, cleanTables } = require('../../../startup/db');
const { User } = require('../../../models/user');
const _ = require('lodash');

let server;
let user;
let token;
let name;
let email;
let path = '/api/v1/users';
let username;
let password;
// eslint-disable-next-line camelcase
let is_admin;

const exec = async () => {
  const result = await request(server)
    .post(path)
    .set('x-auth-token', token)
    .send({ name, email, username, password, is_admin, is_admin });
  return result;
};

const beforeE = async () => {
  server = require('../../../index');
  token = await User.generateAuthToken();

  username = 'ezehlivinus';
  name = 'Ezeh';
  email = 'ezeh@gmail.com';
  password = '12345';
  is_admin = 'true';

  user = new User(username, email, password, name, is_admin);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
};

const afterE = async () => {
  await cleanTables(db);
  await server.close();
};

describe('User Post /auth/create-user', () => {
  beforeAll(async () => {
    path += '/auth/create-user';
  });

  afterAll(async () => {
    path = '/api/v1/users';
  });

  beforeEach(async () => {
    await beforeE();
  });

  afterEach(async () => {
    await afterE();
  });

  it('should return 401 if users/admin is not loggin', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if name is not provided', async () => {
    name = '';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if email is not provided', async () => {
    email = '';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if username is not provided', async () => {
    username = '';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if password is not provided', async () => {
    password = '';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  /*
    it('should return 200 if request is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    */

  it('should return 400 if the user already exist', async () => {
    const res = await exec();

    const userInDb = await User.findById(user.id);
    expect(user.username).toEqual(userInDb.username);
    expect(res.status).toBe(400);

    /*
      expect(Object.keys(res.body.rows[0])).toEqual(
        expect.arrayContaining(['email', 'username'])
      );
      */
  });
});

describe('User: Post /auth/login ', () => {
  beforeAll(async () => {
    path += '/auth/login';
  });

  afterAll(async () => {
    path = '/api/v1/users';
  });

  beforeEach(async () => {
    await beforeE();
  });

  afterEach(async () => {
    await afterE();
  });

  // Return 400 if email is provided
  it('should return 400 if password or email is not provided', async () => {
    password = '';

    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if password or email is not provided', async () => {
    email = '';

    const res = await exec();
    expect(res.status).toBe(400);
  });

  // Return 400 if no user found with the given email
  //   message: invalid email or password
  // it('should return 400 if no user found with the given email', async () => {
  //   await cleanTables(db);

  //   const res = await exec();

  //   expect(res.body.status).toBe('error');
  //   // expect(res.body).toB;
  // });

  // Return 400 if bcrypt.compare return error
  //   message: invalid email or password
  // return logged user with success message
});
