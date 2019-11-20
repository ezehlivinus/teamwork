require('express-async-errors');

const express = require('express');

const logger = require('./startup/logging')();

const app = express();

let port = process.env.port || 3000;

const server = app.listen(port, () => {
  logger.info(`Listining on port ${port}...`);
});

module.exports = server;
