const express = require('express');
const bodyParser = require('body-parser');
const { redisClient, addTaskToRedis, fetchAllTasksFromRedis } = require('./redis');
const { db, addTasksToMongoDB } = require('./mongodb');
const mqttClient = require('./mqtt');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mqttClient.subscribe('/add');
mqttClient.on('message', (topic, message) => {
  if (topic === '/add') {
    const task = message.toString();
    addTaskToRedis('FULLSTACK_TASK_YOGESH', task)
      .then(() => {
        console.log('Task added to Redis:', task);
      })
      .catch((err) => {
        console.error('Error adding task to Redis:', err);
      });
  }
});

app.get('/fetchAllTasks', (req, res) => {
  fetchAllTasksFromRedis('FULLSTACK_TASK_YOGESH')
    .then((tasks) => {
      if (tasks.length > 50) {
        addTasksToMongoDB(tasks)
          .then(() => {
           
          })
          .catch((err) => {
            console.error('Error adding tasks to MongoDB:', err);
          });
      }
      res.json(tasks);
    })
    .catch((err) => {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
