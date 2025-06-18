const { sequelize } = require('../db/pg');
const Log = require('../models/log');
const Url = require('../models/url');

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ All models synced');
  } catch (err) {
    console.error('❌ Failed to sync models:', err.message);
  }
};

syncModels();
