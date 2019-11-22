const db = require('../startup/db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM users');

  res.send(result.rows);
});

module.exports = router;
