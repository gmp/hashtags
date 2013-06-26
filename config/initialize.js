var express = require('express'),
    http = require('http'),
    path = require('path'),
    instaG = require('../instaOauth/authenticate.js');

module.exports = function(){
  var app = express();
	app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon(__dirname + '/../public/images/hashtag.png'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  instaG.init(app);
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '../public')));
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
  return app;
};
