const { DataTypes } = require('sequelize');
const sequelize = require('./../../db_connect');
const { v4: uuidv4 } = require('uuid');

const Contact = sequelize.define(
  'contacts',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    value: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING }
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

Contact.beforeCreate((model, _) => {
  model.uuid = uuidv4();
});

module.exports = Contact;
