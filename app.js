
var controller = require('./config/routes.js'), 
    http = require('http'),
    database = require('./models/database.js'),
    app = require('./config/initialize.js')();

controller(app);

require('./controllers/userDummy.js')();

require('./controllers/gameDummy.js')();

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('message', { hello: 'world' });
  socket.on('event', function (data) {
    console.log(data);
  });
});

