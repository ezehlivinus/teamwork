/* eslint-disable camelcase */
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { Model } = require('./model');
const { db } = require('../startup/db');

class User extends Model {
  constructor(username, email, password, name = null, is_admin = false) {
    super();
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.is_admin = is_admin;
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
      (username, email, password, name, is_admin) VALUES($1, $2, $3, $4, $5)`;

    const result = await db.query(text, values);

    const user = await User.findById(result.rowCount);
    return user;
  }

  static async findUsername() {
    const tableName = `users`;
    const result = await db.query(`SELECT * FROM ${tableName}`);
    return result;
  }
}

const validateUser = user => {
  const schema = {
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
  };

  return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
