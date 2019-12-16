const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
// const { User } = require('../modelss/user');
const Sequelize = require('sequelize');

const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  let users = await User.findAll({ limit: 5, offset: 0 });

  if (_.isEmpty(users)) {
    return res.status(404).send({ status: 'error', message: 'No user found' });
  }

  res.status(200).send({ status: 'Success', data: users });
};

exports.getUser = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  let user;
  try {
    user = await User.findByPk(id);
    if (_.isEmpty(user)) {
      return res.status(404).send({ status: 'error', message: 'No user found' });
    }

    delete user.dataValues.password;
    res.status(200).send({ status: 'Success', data: user });
  } catch (ex) {
    throw new Error(ex);
  }
};

exports.createUser = async (req, res) => {
  try {
    let user = await User.build(req.body);
    user.slug = User.slug(req.body.name, req.body.email);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    delete user.dataValues.password;

    const token = user.generateAuthToken();

    user.dataValues.message = 'User account created successfully';
    user.dataValues.token = token;

    res.status(200).send({ status: 'Success', data: user });
  } catch (ex) {
    let excemption = ex;
    if (!_.isEmpty(ex.errors)) {
      let error = ex.errors[0];
      excemption = `${error.type}, ${error.message}`;
    }

    throw new Error(excemption);
  }
};

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (_.isEmpty(user)) {
      return res.status(400).send({ status: 'error', message: 'Invalide password or email' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send({ status: 'error', message: 'Invalide password or email' });
    }

    delete user.dataValues.password;
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.get('jwt_key'));

    user.dataValues.token = token;

    res.status(200).send({ status: 'Success', message: 'Login was successful', data: user });
  } catch (ex) {
    throw new Error(ex);
  }
};

exports.editUser = async (req, res) => {
  let id = Number.parseInt(req.params.id);

  if (!_.isInteger(id)) {
    return res.status(400).send('User not found');
  }

  let user;
  try {
    user = await User.findOne({
      where: {
        id: req.params.id
      }
    });

    if (_.isEmpty(user)) {
      return res.status(404).send({ status: 'error', message: 'No user found' });
    }

    delete user.dataValues.password;
    user.update(req.body);
    delete user.dataValues.password;
    user.message = 'Edited successfully';

    res.status(200).send({ status: 'Success', data: user });
  } catch (ex) {
    let excemption = ex;
    if (!_.isEmpty(ex.errors)) {
      let error = ex.errors[0];
      excemption = `${error.type}, ${error.message}`;
    }

    throw new Error(excemption);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id
      }
    });

    if (_.isEmpty(user)) {
      return res.status(404).send({ status: 'error', message: 'Something went wrong....' });
    }

    user.destroy();
    res.status(200).send({ status: 'Success', data: user });
  } catch (ex) {
    let excemption = ex;
    if (!_.isEmpty(ex.errors)) {
      let error = ex.errors[0];
      excemption = `${error.type}, ${error.message}`;
    }

    throw new Error(excemption);
  }

  res.status(200).send({ status: 'Success', message: 'User deleted' });
};
