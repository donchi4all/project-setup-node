'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('users', [{
      id: 'e1406595-1185-4370-bd86-864884806807',
      email: 'chisom.mkparu@vfdtech.ng',
      password: '28f6a5f5ac65a9adaf5693efbfa7c05e5bff31bafbc4f66063989af6d9f142c0', //'Password@1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], 
    {
      // Add the updateOnDuplicate option to handle duplicates
      updateOnDuplicate: ['status', 'updatedAt'],
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert user seed here.
     *
      */
    await queryInterface.bulkDelete('users', null, {});

  }
};
