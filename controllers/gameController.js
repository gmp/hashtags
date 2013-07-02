var Game = require('../models/gameModel.js');
var socketEvents = require('../config/socketEvents.js');

exports.findById = function(req, res){
  var id = req.params.id;
  console.log('Retrieving game: ' + id);
  Game.findById(id, function(err, obj){
    res.send(obj);
  });
};

exports.updateById = function(req, res){
  var gameId = req.params.id;
  var player = req.body;
  if(player.isJ){
    console.log("you are the judge and I don't know what to do")
  } else {
    console.log('sup');
	  Game.findById(gameId, function (err, obj){
      console.log('this is the old player', obj.players[player.userGlobalId]);
      console.log('this is the new player', player);
	    obj.players[player.userGlobalId] = player;
	    obj.save(function (err){
	      if(err)(console.error(err));
	      socketEvents.io.sockets.in(gameId).emit('otherPlayerSubmit');
        res.writeHead(204);
        res.end();
	    });
	  });
  }
};

