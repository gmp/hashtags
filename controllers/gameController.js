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
  var id = req.params.id;
  console.log("req.body", req.body);
  Game.findById(id, function(err, obj){
    console.log(obj);
    obj.save(function(err){
      if(err)(console.error(err));
      io.alertRoom(req.body._id);
    });
  });
};