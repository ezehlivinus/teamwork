/* eslint-disable linebreak-style */
const faker = require('faker');
let data = [];
for (let count = 1; count <= 10; count += 1) {
  faker.seed(count);
  let randomName = faker.name.findName();
  let randomEmail = faker.internet.email();
  let randomPassword = faker.internet.password();
  let randomIsAdmin = faker.random.boolean();
  let randomSlug = faker.helpers.slugify(randomName);
  data.push({
    name: randomName,
    slug: randomSlug,
    password: randomPassword,
    email: randomEmail,
    isAdmin: randomIsAdmin
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    const users = await queryInterface.bulkInsert(
      'users',
      // [
      //   {
      //     name: 'John Doe',
      //     password: '1234',
      //     email: 'joe@demo.com',
      //     isAdmin: false
      //   },
      //   {
      //     name: 'Ezeh',
      //     password: '1234',
      //     email: 'ezeh@demo.com',
      //     isAdmin: true
      //   }
      // ],
      data,

      {}
    );
    return users;
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const users = await queryInterface.bulkDelete('users', null, {});
    return users;
  }
};
