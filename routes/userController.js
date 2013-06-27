var User = require('../db/UserModel.js');

exports.findById = function(req, res){
	var id = req.params.id;
    console.log('Retrieving user: ' + id);
    User.findById(id, function(err, obj){
    	res.send(obj);
    });
};