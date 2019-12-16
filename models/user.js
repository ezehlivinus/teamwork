/* eslint-disable linebreak-style */
const Joi = require('@hapi/joi');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('config');
const { sequelize } = require('../startup/db');

const { Model } = Sequelize;
class User extends Model {
  static slug(name, email) {
    let slug = [name, email.split('@')[0]].join('');
    slug = slug.replace(' ', '-').toLocaleLowerCase();
    return slug;
  }

  generateAuthToken() {
    const token = jwt.sign({ id: this.id, isAdmin: this.isAdmin }, config.get('jwt_key'));

    return token;
  }
}

User.init(
  {
    slug: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: { type: Sequelize.STRING },
    isAdmin: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: 'users',
    paranoid: true
    // options
  }
);

// const User = sequelize.define(
//   'user',
//   {
//     id: {
//       allowNull: false,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     slug: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     name: {
//       type: Sequelize.STRING(100),
//       allowNull: false,
//       validate: {
//         is: ['^[a-z]+$', 'i'],
//         min: 3
//       }
//     },
//     email: {
//       type: Sequelize.STRING(100),
//       unique: true,
//       allowNull: false,
//       validate: {
//         isEmail: true
//       }
//     },
//     password: {
//       type: Sequelize.STRING(200),
//       allowNull: false
//     },
//     isAdmin: {
//       type: Sequelize.BOOLEAN,
//       defaultValue: false
//     }
//   },
//   {
//     // options
//   }
// );

// Signup details
const validateUser = user => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    // slug: Joi.string().default(User.slug(user.name, user.email)),
    password: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .email()
      .required(),
    isAdmin: Joi.boolean()
  });

  return schema.validate(user);
};

// Signin details
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
