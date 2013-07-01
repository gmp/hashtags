var Game = require('../models/gameModel.js');
var io = require('../config/socketEvents.js');

exports.findById = function(req, res){
  var id = req.params.id;
    console.log('Retrieving game: ' + id);
    Game.findById(id, function(err, obj){
      res.send(obj);
    });
};

exports.updateById = function(req, res){
  console.log('thisworked');
  console.log(req.body._id);
  console.log('io!!!!!', io);
  io.alertRoom(req.body._id);
};