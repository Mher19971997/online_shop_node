const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Images = sequelize.define(
  'images',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    image: { type: DataTypes.STRING, allowNull: false },
    catalogUuid: { type: DataTypes.UUID, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Images.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Images;
