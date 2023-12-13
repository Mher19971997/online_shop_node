const { DataTypes } = require('sequelize');
const sequelize = require('../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Catalog = sequelize.define(
  'catalogs',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    subCategoryUuid: { type: DataTypes.UUID, allowNull: false },
    categoryUuid: { type: DataTypes.UUID, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Catalog.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Catalog;
