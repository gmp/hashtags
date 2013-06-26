
var controller = require('./routes/controller.js'), 
    http = require('http'),
    database = require('./db/database.js'),
    config = require('./config/initialize.js');


var app = config();

database.setUpDatabase();



controller(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
