'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      userUuid: { type: Sequelize.UUID },
      catalogUuid: { type: Sequelize.UUID },
      quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
      price: { type: Sequelize.INTEGER },
      type: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING, defaultValue: 'Pending' },
      order_N: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {}
};