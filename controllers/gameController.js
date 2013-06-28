var Game = require('../models/gameModel.js');

exports.findById = function(req, res){
	var id = req.params.id;
    console.log('Retrieving game: ' + id);
    Game.findById(id, function(err, obj){
    	res.send(obj);
    });
};