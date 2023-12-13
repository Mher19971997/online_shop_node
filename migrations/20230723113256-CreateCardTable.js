'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      userUuid: { type: Sequelize.UUID },
      clientName: { type: Sequelize.STRING, allowNull: false },
      cardNumber: { type: Sequelize.STRING, allowNull: false },
      cvv: { type: Sequelize.INTEGER, allowNull: false },
      expDate: { type: Sequelize.INTEGER, allowNull: false },
      association: { type: Sequelize.STRING, allowNull: false },
      defaultCard: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('cardsBalances', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      userUuid: { type: Sequelize.UUID },
      cardUuid: { type: Sequelize.UUID },
      balance: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 100000 },
      currencies: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'AMD'
      },      
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down (queryInterface, Sequelize) {}
};