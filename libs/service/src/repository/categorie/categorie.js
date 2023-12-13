const { DataTypes } = require('sequelize');
const sequelize = require('../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Categorie = sequelize.define(
  'categories',
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
Categorie.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Categorie;
