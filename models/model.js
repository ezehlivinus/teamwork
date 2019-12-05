const { db } = require('../startup/db');

class Model {
  static async findById(id) {
    // make this to accept more parameters in place of *
    const result = await db.query(`SELECT * FROM ${this.name}s WHERE id = $1`, [
      id
    ]);
    return result;
  }

  static async find() {
    const tableName = `${this.name.toLowerCase()}s`;
    const result = await db.query(`SELECT * FROM ${tableName}`);
    return result;
  }
}

module.exports.Model = Model;
