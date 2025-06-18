const {redisClient} = require('../db/redis')
const RATE_LIMIT = 100;
const WINDOW_SECONDS = 60 * 60;

exports.rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate:${ip}`;

  const current = await redisClient.get(key);

  if (current && parseInt(current) >= RATE_LIMIT) {
    return res.status(429).json({ message: 'Too many requests. Try later.' });
  }

  if (current) {
    await redisClient.incr(key);
  } else {
    await redisClient.set(key, 1, { EX: WINDOW_SECONDS });
  }

  next();
};
