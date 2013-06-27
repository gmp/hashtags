
var controller = require('./routes/controller.js'), 
    http = require('http'),
    database = require('./db/database.js'),
    app = require('./config/initialize.js')();

controller(app);

require('./routes/userDummy.js')();

require('./routes/gameDummy.js')();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
