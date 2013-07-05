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
  var oldJudge;
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
          oldJudge = item.userGlobalId;
          console.log('how many times');
        }
        if(submitted.winner === item.username){
          obj.set('players.'+item.userGlobalId+'.score', ++item.score);
        }
      });
      var currentround = obj.round + 1;
      var nJ = currentround % 4;
      var newJudge = obj.judgingOrder[nJ];
      newJudge = newJudge.toString();
      var judge = {};
      judge.username = obj.players[newJudge].username;
      judge.avatarURL = obj.players[newJudge].avatarURL;
      judge.userGlobalId = newJudge;
      obj.set('players.' + newJudge +'.isJ', true);
      obj.set('judge', judge);
      obj.set('prompt', 'the next prompt');
      obj.set('round', currentround);
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
      } else if (oldJudge) {
        clients[oldJudge].broadcast.to(gameId).emit('otherPlayerSubmit');
      }
      res.writeHead(204);
      res.end();
    });
  });
};
