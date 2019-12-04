const express = require('express');

const router = express.Router();
const db = require('../startup/db');
const { User, validate } = require('../models/user');

router.get('/', async (req, res) => {
  // const result = await db.query('SELECT * FROM users');
  // res.send(result.rows);
  // const users = await User.find();
  // res.send(users);
});

router.post('/auth/create-user', async (req, res) => {
  // Return 401 if admin/user is not logged in
  // Return 400 if name is not provided
  // Return 400 if email is not provided
  // Return 400 if username is not provided
  // Return 400 if password is not provided
  // Return 400 if username already exist
  // Return 400 if email already exist
  // Return 200 if this is a valid request
  // Retun the user
});

module.exports = router;
