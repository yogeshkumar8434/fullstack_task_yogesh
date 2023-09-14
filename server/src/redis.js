const redis = require('redis');

const redisClient = redis.createClient({
  host: 'redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  port: 12675,
  password: 'd$6neLHA4Pz_zEP',
});

redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

function addTaskToRedis(key, task) {
  return new Promise((resolve, reject) => {
    redisClient.rpush(key, task, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function fetchAllTasksFromRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.lrange(key, 0, -1, (err, tasks) => {
      if (err) reject(err);
      else resolve(tasks);
    });
  });
}

module.exports = { redisClient, addTaskToRedis, fetchAllTasksFromRedis };
