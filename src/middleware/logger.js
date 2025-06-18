const Log = require('../models/log');

exports.logMiddleware = async (req, res, next) => {
  const { code } = req.params;
  const ip = req.ip;
  const referrer = req.get('Referrer') || 'direct';
  console.log
  try {
    await Log.create({ code, ip, referrer });
  } catch (err) {
    console.error('Log insert failed:', err.message);
  }

  next();
};
