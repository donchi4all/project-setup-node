'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed profile here.
     **/
    await queryInterface.bulkInsert('profiles', [{
      id: 'e1406595-1185-4370-bd86-864884806801',
      userId: 'e1406595-1185-4370-bd86-864884806807',
      firstName: 'Chisom',
      lastName: 'Mkparu',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      // Add the updateOnDuplicate option to handle duplicates
      updateOnDuplicate: ['updatedAt'],
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profiles', null, {});

  }
};
