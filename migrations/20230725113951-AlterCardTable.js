'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cards', 'balanceUuid');
  },

  async down(queryInterface, Sequelize) {}
};
