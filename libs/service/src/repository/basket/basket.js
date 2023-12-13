const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Basket = sequelize.define(
  'baskets',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userUuid: { type: DataTypes.UUID, allowNull: false },
    catalogUuid: { type: DataTypes.UUID },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Basket.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Basket;
