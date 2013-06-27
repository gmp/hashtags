var games = require('../db/gameModel.js');

exports.findById = function(req, res){
	var id = req.params.id;
    console.log('Retrieving game: ' + id);
    games.Game.findById(id, function(err, obj){
      console.log("obj in gameController: ", obj);
    	res.send(obj);
    });
};