const db = require('../startup/db');
const { User, validateUser } = require('../models/user');
const validate = require('../middleware/validate');
const Joi = require('@hapi/joi');

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
  // const user = new User('ezeh', 'ezeh@gamil.com')
  let user = await User.findOne(req.body.email);

  if (user.rowCount > 0) {
    return res
      .status(400)
      .send({ status: 'error', error: 'User already registered' });
  }

  let values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.is_admin
  ];

  user = new User(...values);
  user = await user.save();

  let data = {
    message: 'User account created successfully',
    ...user
  };

  res.send({ status: 'Success', data });
  // res.status(200).send('User created successfully');

  // Retun the user
};

exports.login = async (req, res) => {
  // res.send('He is logged in');
  // const login = user => {
  //   const schema = Joi.object({
  //     username: Joi.string()
  //       .alphanum()
  //       .min(3),
  //     password: Joi.string()
  //       .required()
  //       .min(3)
  //   });
  //   return schema.validate(user);
  // };
};
