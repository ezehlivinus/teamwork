const { Pool } = require('pg');
const config = require('config');
const logger = require('./logging')();

const connection = config.get('db');
const pool = new Pool(connection);

pool.connect().then(() => logger.info('Connected to postgres db...'));

module.exports = {
  query: (queryString, queryParams) => pool.query(queryString, queryParams)
};
