

var mongoose = require('mongoose');

var config = {
  // MongoDB endpoint
  mongoDb: process.env.HASH_MONGO_URI,
};

mongoose.connect(config.mongoDb);
module.exports = mongoose;

