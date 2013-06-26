exports.setUpDatabase = function(){


  var mongoose = require('mongoose');

  var config = {
      // MongoDB endpoint
      mongoDb: process.env.HASH_MONGO_URI,
  };

  mongoose.connect(config.mongoDb);

  var Schema = mongoose.Schema;
  var Player = {
    //Or selected hash tag, waiting, judge, ended
    status: 'isFresh',
    imageURL : undefined,

  }
  var Game = new Schema({
     title  : String,
     players : []
  })

  var User = new Schema({
    username: String,
    accessToken: String,
    looking: false,
    avatarURL: String
  });

  var MyGame = mongoose.model('GameModel', Game);
  var game = new MyGame();
  game.title = "Test Title";
  game.save(function(err){
      if(err)console.log(err);
      else console.log('success!');
  });
}