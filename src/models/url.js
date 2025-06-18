const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/pg');

const Url = sequelize.define('Url', {
  code: {
    type: DataTypes.STRING(10),
    unique: true,
    allowNull: false,
  },
  longUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Url;
