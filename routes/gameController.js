var Game = require('../db/gameModel.js');

exports.findById = function(req, res){
	var id = req.params.id;
    console.log('Retrieving user: ' + id);
    Game.findById(id, function(err, obj){
    	res.send(obj);
    });
};