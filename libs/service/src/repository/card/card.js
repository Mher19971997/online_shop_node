const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Card = sequelize.define(
  'cards',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userUuid: { type: DataTypes.UUID, allowNull: false },
    clientName: { type: DataTypes.STRING, allowNull: false },
    cardNumber: { type: DataTypes.STRING, allowNull: false },
    cardNumber: { type: DataTypes.STRING, allowNull: false },
    cvv: { type: DataTypes.STRING, allowNull: false},
    expDate: { type: DataTypes.STRING, allowNull: false},
    association: { type: DataTypes.STRING, allowNull: false},
    defaultCard: { type: DataTypes.INTEGER, allowNull: false},
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Card.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Card;