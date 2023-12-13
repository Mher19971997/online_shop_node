const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const CardBalance = sequelize.define(
  'cardsBalances',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userUuid: { type: DataTypes.UUID, allowNull: false },
    cardUuid: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.STRING, allowNull: false, defaultValue: 100000 },
    currencies: { type: DataTypes.STRING, allowNull: false, defaultValue: 'AMD'},
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

CardBalance.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = CardBalance;