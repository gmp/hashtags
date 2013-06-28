
var controller = require('./config/routes.js'), 
    http = require('http'),
    database = require('./models/database.js'),
    app = require('./config/initialize.js')();

controller(app);

require('./controllers/userDummy.js')();

require('./controllers/gameDummy.js')();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
