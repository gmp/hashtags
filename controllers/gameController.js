var Game = require('../models/gameModel.js');
var clients = require('../config/socketEvents.js').clients;
var _ = require('underscore');

exports.findById = function(req, res){
  var id = req.params.id;
  console.log('Retrieving game: ' + id);
  Game.findById(id, function(err, obj){
    res.send(obj);
  });
};

exports.updateById = function(req, res){
  var gameId = req.params.id;
  var submitted = req.body;
  Game.findById(gameId, function (err, obj){
    if(submitted.winner){
      //need to deal with prompts
      _.each(obj.players, function(item){
        //change players hands
        obj.set('players.'+item.userGlobalId+'.continued', false);
        obj.set('players.'+item.userGlobalId+'.submitted', false);
        obj.set('players.'+item.userGlobalId+'.submission', {});
        if(item.isJ){
          obj.set('players.'+item.userGlobalId+'.isJ', false);
        }
        //deal with judge in a real way
        if(item.username === 'gmp5'){
          obj.set('players.'+item.userGlobalId+'.isJ', true);
          obj.set('judge', {username:"gmp5", avatarURL: "http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", userGlobalId: item.userGlobalId});
        }
      });
      obj.set('prompt', 'the next prompt');
      obj.set('round', ++obj.round);
      obj.set('gameEnd', true);
      obj.set('numberOfSub', 0);
      obj.set('previousRound', submitted);
    } else {
      obj.set('players.'+submitted.userGlobalId, submitted);
    }
    obj.save( function (err, doc){
      if(err) console.error(err);
      if(submitted.userGlobalId){
        clients[submitted.userGlobalId].broadcast.to(gameId).emit('otherPlayerSubmit');
      }
      res.writeHead(204);
      res.end();
    });
  });
};
