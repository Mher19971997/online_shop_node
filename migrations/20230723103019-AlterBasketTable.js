'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('baskets', 'quantity', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 1
    });

    await queryInterface.addColumn('baskets', 'catalogUuid', {
      type: Sequelize.UUID
    });
  },
  async down(queryInterface, Sequelize) {}
};