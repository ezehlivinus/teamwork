const express = require('express');

const app = express();

let port = process.env.port || 3000;
const server = app.listen(port, () => console.log(`Listining on port ${port}`));

module.exports = server;
