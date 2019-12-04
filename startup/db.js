const { Pool } = require('pg');
const config = require('config');
const logger = require('./logging')();

const connection = config.get('db');
const pool = new Pool(connection);

pool
  .connect()
  .then(() =>
    logger.info(`Connected to postgres: ${connection.database} db...`)
  )
  .catch(ex => {
    throw ex;
  });

const cleanTables = async db => {
  const tables = await db.query(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog'
    AND schemaname != 'information_schema'`);
  let tableNames = [];
  tables.rows.forEach(table => {
    tableNames.push(table.tablename);
  });

  const query = await db.query(
    `TRUNCATE TABLE ${tableNames.join(',')} RESTART IDENTITY CASCADE`
  );
  return query;
};

const db = {
  query: (queryString, queryParams) => pool.query(queryString, queryParams)
};

module.exports.db = db;
module.exports.cleanTables = cleanTables;
