const express = require('express');

const router = express.Router();
const db = require('../startup/db');
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  // const result = await db.query('SELECT * FROM users');
  // res.send(result.rows);
  // const users = await User.find();
  // res.send(users);
});

module.exports = router;
