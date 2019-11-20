require('express-async-errors');
const express = require('express');
const error = require('./middleware/error');

const app = express();

app.use(error);

let port = process.env.port || 3000;
const server = app.listen(port, () => console.log(`Listining on port ${port}`));

module.exports = server;
