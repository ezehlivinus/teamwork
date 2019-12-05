/* eslint-disable global-require */
const request = require('supertest');
const { db, cleanTables } = require('../../../startup/db');
const { User } = require('../../../models/user');

describe('User /api/v1/users', () => {
  let server;
  let user;
  let token;
  let name;
  let email;
  let path;
  let username;
  let password;
  // eslint-disable-next-line camelcase
  let is_admin;

  const exec = async () => {
    const result = await request(server)
      .post(path)
      .set('x-auth-token', token)
      .send({ name, email, username, password, is_admin, token, is_admin });
    return result;
  };

  beforeEach(async () => {
    server = require('../../../index');
    token = await User.generateAuthToken();
    path = '/api/v1/users';

    user = new User('ezehlivinus', 'ezeh@gmail.com', '12345', 'Ezeh', true);
    user = await user.save();

    const userFields = user.rows[0];
    username = userFields.username;
    name = userFields.name;
    email = userFields.email;
    password = userFields.password;
    is_admin = userFields.is_admin;
  });

  afterEach(async () => {
    path = '/api/v1/users';
    await cleanTables(db);
    await server.close();
  });

  it('should return 401 if users/admin is not loggin', async () => {
    token = '';

    path += '/auth/create-user';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if name is not provided', async () => {
    name = '';
    path += '/auth/create-user';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if email is not provided', async () => {
    email = '';
    path += '/auth/create-user';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if username is not provided', async () => {
    username = '';
    path += '/auth/create-user';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if password is not provided', async () => {
    password = '';
    path += '/auth/create-user';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if request is valid', async () => {
    path += '/auth/create-user';
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it('should return the user in the body of the res', async () => {
    path += '/auth/create-user';
    const res = await exec();

    const userInDb = await User.findById(user.rows[0].id);

    expect(res.body.rows[0].username).toEqual(userInDb.rows[0].username);
    // This one below also works with jest test framework
    /*
    expect(Object.keys(res.body.rows[0])).toEqual(
      expect.arrayContaining(['email', 'username'])
    );
    */
  });
});
