exports.setUpDatabase = function(){

  console.log("shnur");

  var mongoose = require('mongoose');

  var config = {
      // MongoDB endpoint
      mongoDb: process.env.HASH_MONGO_URI,
  };

  console.log(process.env.HASH_MONGO_URI);

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
  game.title = "hSHNUURSJISJ";
  game.save(function(err){
      if(err)console.log(err);
      else console.log('success!');
  });
}