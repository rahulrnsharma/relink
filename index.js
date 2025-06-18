const express = require('express');
require('dotenv').config();
require('./src/utils/syncModels');
const { shortenUrl, redirectUrl, getAnalytics } = require('./src/controllers/url.controller');
const { sequelize } = require('./src/db/pg');
const { logMiddleware } = require('./src/middleware/logger');
const { rateLimiter } = require('./src/middleware/limiter');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(rateLimiter); 
app.post('/shorten', shortenUrl);
app.get('/:code', logMiddleware, redirectUrl);
app.get('/analytics/:code', getAnalytics);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
