const { DataTypes } = require('sequelize');
const sequelize = require('../../db_connect');
const { v4: uuidv4 } = require('uuid');

const CatalogInfo = sequelize.define(
  'catalogInfos',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    catalogUuid: { type: DataTypes.UUID, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

CatalogInfo.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = CatalogInfo;
