/* eslint-disable global-require */
const { db, cleanTables } = require('../../../startup/db');
const { User } = require('../../../models/user');

describe('/api/v1/users', () => {
  let server;
  let user;

  beforeEach(async () => {
    server = require('../../../index');

    user = new User('ezehlivinus', 'ezeh@gmail.com', '12345', 'Ezeh', true);
  });

  afterEach(async () => {
    await cleanTables(db);
    await server.close();
  });

  it('should return all users', async () => {
    let s = await db.query('');

    expect(query).toEqual(tables);
  });
});
