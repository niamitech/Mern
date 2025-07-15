// backend/utils/redisClient.js
const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Redis Connected');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
})();

module.exports = redisClient;
