
var controller = require('./config/routes.js'),
    http = require('http'),
    database = require('./models/database.js'),
    app = require('./config/initialize.js')(),
    io = require('./config/socketEvents');

controller(app);

//require('./controllers/inviteDummy.js')();

require('./controllers/userDummy.js')();

//require('./controllers/gameDummy.js')();



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var sockets = io.socketStart(server);

exports.sock = sockets;