'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cards', 'expDate');
    await queryInterface.addColumn('cards', 'expDate', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 1
    });
  },

  async down (queryInterface, Sequelize) {
  }
};