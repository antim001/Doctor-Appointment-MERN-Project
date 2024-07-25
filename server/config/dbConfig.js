const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL=process.env.MONGOURL
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB is connected');
});

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

module.exports = mongoose;
