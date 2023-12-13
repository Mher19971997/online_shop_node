const { DataTypes } = require('sequelize');
const sequelize = require('../../db_connect');
const { v4: uuidv4 } = require('uuid');

const TypeBrand = sequelize.define(
  'typeBrands',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    subCategoryUuid: { type: DataTypes.UUID, allowNull: false },
    categoryUuid: { type: DataTypes.UUID, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);
TypeBrand.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = TypeBrand;
