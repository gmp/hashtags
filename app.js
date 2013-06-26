
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

var config = {
    // MongoDB endpoint
    mongoDb: 'mongodb://ericrius1:fffarg695@ds031968.mongolab.com:31968/hashers',

};

mongoose.connect(config.mongoDb);

var Schema = mongoose.Schema;
var Game = new Schema({
   title  : String,
   players : []
})

var User = new Schema({
  username: String,
  accessToken: String 

})

var MyGame = mongoose.model('GameModel', Game);
var game = new MyGame();
game.title = "hello world";
game.save(function(err){
    if(err)console.log("error");
    else console.log('success!');
});



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
