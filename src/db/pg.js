const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres', {
  dialect: 'postgres',
  logging: false,
});

module.exports = { sequelize };
