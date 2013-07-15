var mongoose = require('mongoose');

var config = {
    // MongoDB endpoint
    mongoDb: process.env.HASH_MONGO_URI,
};

//Configutes mongoose as mongo's object modeler 
mongoose.connect(config.mongoDb);

