const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { uuid } = require('uuidv4');

const Configuration = sequelize.define(
  'configurations',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    module: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.JSONB, defaultValue: {} }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Configuration.beforeCreate((model, _) => {
  model.uuid = uuid();
});

module.exports = Configuration;
