const { db, cleanTables } = require('../../../startup/db');

const Pool = require('pg');

describe('/api/v1/users', () => {
  let server;

  beforeEach(async () => {
    server = require('../../../index');
  });

  afterEach(async () => {
    await cleanTables(db);
    await server.close();
  });

  it('should return all users', async () => {
    let s = await db.query('');

    // expect(query).toEqual(tables);
  });
});
