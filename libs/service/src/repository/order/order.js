const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Order = sequelize.define(
  'orders',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    catalogUuid: { type: DataTypes.UUID, allowNull: false },
    userUuid: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    order_N: { type: DataTypes.STRING, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Order.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Order;
