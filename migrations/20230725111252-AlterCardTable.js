'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cards', 'cvv');
    await queryInterface.addColumn('cards', 'cvv', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 1
    });
  },

  async down(queryInterface, Sequelize) {}
};