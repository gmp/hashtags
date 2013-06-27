
var controller = require('./routes/controller.js'), 
    http = require('http'),
    database = require('./db/database.js'),
    config = require('./config/initialize.js');


var app = config();
console.log(database);
var Schema = database.mongoose.Schema;
var Player = {
  //Or selected hash tag, waiting, judge, ended
  status: 'isFresh',
  imageURL: undefined,

}
var GameSchema = new Schema({
  title: String,
  players: []
})

var UserSchema = new Schema({
  username: String,
  accessToken: String,
  looking: false,
  avatarURL: String
});

var Game = module.mongoose.model('GameModel', GameSchema);
var game = new Game();
game.title = "Test Title";
game.save(function(err) {
  if (err) console.log(err);
  else console.log('success!');
});



controller(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
