const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const BasketDevice = sequelize.define(
  'basketDevices',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    basketUuid: { type: DataTypes.UUID, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);
BasketDevice.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = BasketDevice;
