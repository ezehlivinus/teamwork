require('express-async-errors');

const express = require('express');

const logger = require('./startup/logging')();
const error = require('./middleware/error');

const app = express();

require('./startup/config')();
const db = require('./startup/db');

app.use(error);

app.get('/api', async (req, res) => {
  const result = await db.query('SELECT * FROM users');

  res.send(result.rows);
});

let port = process.env.port || 3000;

const server = app.listen(port, () => {
  logger.info(`Listining on port ${port}...`);
});

module.exports = server;
