const db = require('../startup/db');
const { User, validate } = require('../models/user');

exports.getUsers = async (req, res) => {
  // async (req, res) => {
  // const result = await db.query('SELECT * FROM users');
  // res.send(result.rows);
  // const users = await User.find();
  // res.send(users);
  res.send('NOT IMPLEMENTED: Users list');
};

exports.getUser = async (req, res) => {
  res.send('NOT IMPLEMENTED: Get a single users');
};

exports.createUser = async (req, res) => {
  // Return 401 if admin/user is not logged in
  // Return 400 if name is not provided
  // Return 400 if email is not provided
  // Return 400 if username is not provided
  // Return 400 if password is not provided
  // Return 400 if username already exist
  // Return 400 if email already exist
  // Return 200 if this is a valid request
  // Retun the user
};
