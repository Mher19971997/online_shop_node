const { DataTypes } = require('sequelize');
const sequelize = require('../../db_connect');
const { v4: uuidv4 } = require('uuid');

const SubCategorie = sequelize.define(
  'subCategories',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

SubCategorie.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = SubCategorie;
