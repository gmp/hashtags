
var Game = require('../models/gameModel.js');

exports.findById = function(req, res){
  var id = req.params.id;
    console.log('Retrieving game: ' + id);
    Game.findById(id, function(err, obj){
      res.send(obj);
    });
};

exports.updateById = function(req, res){
  console.log('thisworked');
  console.log(req.body.players[3].submission);
};