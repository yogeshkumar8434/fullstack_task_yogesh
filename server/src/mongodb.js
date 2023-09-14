const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@testcluster.6f94f5o.mongodb.net/assignment';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB Error:', err);
});

db.once('open', () => {
    console.log('MongoDB connected successfully');
  });

const TaskSchema = new mongoose.Schema({
  description: String,
});

const TaskModel = mongoose.model('Task', TaskSchema);

function addTasksToMongoDB(tasks) {
  return TaskModel.insertMany(tasks);
}

module.exports = { db, addTasksToMongoDB };

