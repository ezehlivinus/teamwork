/* eslint-disable camelcase */
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
}

module.exports.User = User;
