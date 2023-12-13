const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define(
  'users',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    email: { type: DataTypes.STRING, unique: true },
    avatar: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    status: { type: DataTypes.STRING }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

User.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = User;
