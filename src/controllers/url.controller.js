const Url = require('../models/url');
const Log = require('../models/log');
const { redisClient } = require('../db/redis');

const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

exports.shortenUrl = async (req, res) => {
  const { longUrl, expiresInSeconds } = req.body;
  const code = await generateUniqueCode();
  const expiresAt = expiresInSeconds
    ? new Date(Date.now() + expiresInSeconds * 1000)
    : null;

  await Url.create({ code, longUrl, expiresAt });

  if (expiresInSeconds) {
    await redisClient.set(code, longUrl, { EX: expiresInSeconds });
  } else {
    await redisClient.set(code, longUrl);
  }

  res.json({ shortUrl: `${baseURL}/${code}` });
};

exports.redirectUrl = async (req, res) => {
  const { code } = req.params;

  const cachedUrl = await redisClient.get(code);
  if (cachedUrl) {
    await logAccess(code, req);
    return res.redirect(cachedUrl);
  }

  const url = await Url.findOne({ where: { code } });

  if (!url || !url.longUrl) {
    return res.status(404).send('URL not found or invalid');
  }

  if (url.expiresAt && new Date() > url.expiresAt) {
    return res.status(410).send('Link expired');
  }

  await redisClient.set(code, url.longUrl, {
    EX: url.expiresAt
      ? Math.floor((url.expiresAt - Date.now()) / 1000)
      : undefined,
  });

  await logAccess(code, req);
  return res.redirect(url.longUrl);
};


exports.getAnalytics = async (req, res) => {
  const { code } = req.params;

  const logs = await Log.findAll({ where: { code } });
  const total = logs.length;
  const recent = logs
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map(log => log.createdAt);

  const referrers = {};
  for (const log of logs) {
    referrers[log.referrer] = (referrers[log.referrer] || 0) + 1;
  }

  res.json({ total, recent, referrers });
};

function base62Encode(num) {
  let encoded = '';
  while (num > 0) {
    encoded = chars[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded.padStart(6, '0');
}

async function generateUniqueCode() {
  let code;
  let exists;
  do {
    const randomNum = Math.floor(Math.random() * 1e8);
    code = base62Encode(randomNum);
    exists = await Url.findOne({ where: { code } });
  } while (exists);
  return code;
}

async function logAccess(code, req) {
  await Log.create({
    code,
    referrer: req.get('Referrer') || 'direct',
  });
}
