const express = require('express');

const app = express();

const logger = require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db');

let port = process.env.port || 3000;
const server = app.listen(port, () => {
  logger.info(`Listining on port ${port}...`);
});

module.exports = server;
