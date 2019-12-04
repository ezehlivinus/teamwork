/* eslint-disable camelcase */
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { Model } = require('./model');

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
