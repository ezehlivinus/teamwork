/* eslint-disable camelcase */
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const { Model } = require('./model');
const { db } = require('../startup/db');

class User extends Model {
  constructor(username, email, password, name = null, is_admin = false) {
    super();
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.is_admin = is_admin === true;
  }

  static generateAuthToken() {
    const token = jwt.sign(
      { id: this.id, is_admin: this.is_admin },
      config.get('jwt_key')
    );

    return token;
  }

  async save() {
    const values = [
      this.username,
      this.email,
      this.password,
      this.name,
      this.is_admin
    ];
    const text = `INSERT INTO users 
      (username, email, password, name, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING id`;

    let result = await db.query(text, values);

    let user = await User.findById(result.rows[0].id);

    return user;
  }

  static async findByEmail(email) {
    const tableName = 'users';
    let result = await db.query(
      `SELECT * FROM ${tableName} WHERE email = $1 OR username = $1`,
      [email]
    );

    result = _.pick(result, ['rows']);
    [result] = [result.rows[0]];
    return result;
  }

  static async findOne(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return result;
  }

  static async find() {
    let result = await db.query(`SELECT * FROM users`);

    result = _.pick(result, ['rows']);
    [result] = [result.rows];

    delete result.password;

    return result;
  }

  return() {
    return this;
  }
}

// Signup details
const validateUser = user => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    username: Joi.string()
      .alphanum()
      .min(3),
    password: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .email()
      .required(),
    is_admin: Joi.boolean()
  });

  return schema.validate(user);
};

// Signin detal
const signin = user => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(3)
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.signin = signin;
