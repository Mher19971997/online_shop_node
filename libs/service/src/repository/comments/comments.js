const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { uuid } = require('uuidv4');

const Comment = sequelize.define(
  'comments',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    text: { type: DataTypes.STRING, allowNull: false },
    catalogUuid: { type: DataTypes.UUID, allowNull: false },
    userUuid: { type: DataTypes.UUID, allowNull: false }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Comment.beforeCreate((model, _) => {
  model.uuid = uuid();
});

module.exports = Comment;