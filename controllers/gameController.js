var Game = require('../models/gameModel.js');
var clients = require('../config/socketEvents.js').clients;

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
      obj.set('players.'+player.userGlobalId, player);
	    obj.save( function (err, doc){
	      if(err) console.error(err);
        console.log(doc);
	      clients[player.userGlobalId].broadcast.to(gameId).emit('otherPlayerSubmit');
        res.writeHead(204);
        res.end();
	    });
	  });
  }
};

