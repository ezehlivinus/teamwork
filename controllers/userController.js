const db = require('../startup/db');
const { User, validate } = require('../models/user');

exports.getUsers = async (req, res) => {
  // async (req, res) => {
  // const result = await db.query('SELECT * FROM users');
  // res.send(result.rows);
  // const users = await User.find();
  // res.send(users);
  // let token = await User.generateAuthToken();
  // res.send(token);
};

exports.getUser = async (req, res) => {
  res.send('NOT IMPLEMENTED: Get a single users');
};

exports.createUser = async (req, res) => {
  if (!req.body.password) return res.status(400).send('password not provided');

  if (!req.body.username) return res.status(400).send('username not provided');

  if (!req.body.name) return res.status(400).send("user's name not provided");

  if (!req.body.email) return res.status(400).send("user's email not provided");

  const user = await User.findUsername('ezehlivinus');

  if (!user) return res.status(404).send('No user found');

  res.send(user);
  // res.status(200).send('User created successfully');

  // Retun the user
};
