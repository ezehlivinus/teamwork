const _ = require('lodash');
const { db } = require('../startup/db');

class Model {
  static async findById(id) {
    const tableName = `${this.name.toLowerCase()}s`;
    // make this to accept more parameters in place of *
    try {
      let result = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [
        id
      ]);
      result = _.pick(result, ['rows']);
      [result] = [result.rows[0]];

      if (`${tableName}` === 'users') delete result.password;

      return result;
    } catch (ex) {
      throw new Error(`What you looked for was Not found or possibly : ${ex}`);
    }
  }

  static async find() {
    const tableName = `${this.name.toLowerCase()}s`;
    const result = await db.query(`SELECT * FROM ${tableName}`);
    return result;
  }
}

module.exports.Model = Model;
