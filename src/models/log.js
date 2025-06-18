// models/log.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/pg');
const Url = require('./url');

const Log = sequelize.define('Log', {
    code: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      ip: DataTypes.STRING,
  referrer: DataTypes.STRING,
});

Url.hasMany(Log, { foreignKey: 'code', sourceKey: 'code' });
Log.belongsTo(Url, { foreignKey: 'code', targetKey: 'code' });

module.exports = Log;
