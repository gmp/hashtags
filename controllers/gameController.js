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
  var id = req.params.id;
  var room = req.body._id;

  console.log("req.body", req.body);
  Game.findById(id, function(err, obj){
    console.log(obj);
    obj.save(function(err){
      if(err)(console.error(err));
      socketEvents.io.sockets.in(room).emit('otherPlayerSubmit');
    });
  });
};

