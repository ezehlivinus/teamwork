/* eslint-disable linebreak-style */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const query = await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      slug: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
    return query;
  },
  down: async (queryInterface, Sequelize) => {
    const users = await queryInterface.dropTable('users');
    return users;
  }
};
