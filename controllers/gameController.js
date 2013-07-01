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
  var room = req.body._id;
  console.log("BODY",req.body);
  socketEvents.io.sockets.in(room).emit('otherPlayerSubmit');
};

