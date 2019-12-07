const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  let users = await User.find();
  if (_.isEmpty(users)) {
    return res.status(404).send({ status: 'error', message: 'No user found' });
  }

  const data = [...users];

  res.status(200).send({ status: 'Success', data });
};

exports.getUser = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  if (!_.isInteger(id)) {
    return res.status(400).send('User not found');
  }

  let user;
  try {
    user = await User.findById(id);
  } catch (ex) {
    return res.status(400).send(`User not found: ${ex} `);
  }

  if (_.isEmpty(user)) {
    return res.status(404).send({ status: 'error', message: 'No user found' });
  }

  const data = {
    ...user
  };

  res.status(200).send({ status: 'Success', data });
};

exports.createUser = async (req, res) => {
  let user = await User.findOne(req.body.email);

  if (user.rowCount > 0) {
    return res
      .status(400)
      .send({ status: 'error', message: 'User already registered' });
  }

  let values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.is_admin
  ];

  user = new User(...values);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = User.generateAuthToken();

  const data = {
    message: 'User account created successfully',
    ...user,
    token
  };

  res.status(200).send({ status: 'Success', data });
};

exports.signin = async (req, res) => {
  let user = await User.findByEmail(req.body.email);

  if (_.isEmpty(user)) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Invalide password or email' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Invalide password or email' });
  }

  delete user.password;

  const token = jwt.sign(
    { id: user.id, is_admin: user.is_admin },
    config.get('jwt_key')
  );

  const data = {
    ...user,
    token
  };

  res
    .status(200)
    .send({ status: 'Success', message: 'Login was successful', data });
};

exports.editUser = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  if (!_.isInteger(id)) {
    return res.status(400).send('User not found');
  }

  let user;
  try {
    user = await User.findById(id);
  } catch (ex) {
    return res.status(400).send(`User not found: ${ex} `);
  }

  if (_.isEmpty(user)) {
    return res.status(404).send({ status: 'error', message: 'No user found' });
  }

  req.body.id = id;

  user = await User.findByIdAndUpadte(req.body);

  const data = {
    ...user
  };

  res.status(200).send({ status: 'Success', data });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).send({ status: 'Success', message: 'User deleted' });
};
