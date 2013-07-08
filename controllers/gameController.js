var Game = require('../models/gameModel.js');
var GameData = require('../models/gameDataModel.js');
var clients = require('../config/socketEvents.js').clients;
var _ = require('underscore');

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving game: ' + id);
  Game.findById(id, function(err, obj) {
    res.send(obj);
  });
};

exports.updateById = function(req, res) {
  var gameId = req.params.id;
  var submitted = req.body;
  Game.findById(gameId, function(err, obj) {
    GameData.findById(obj.gameData, function(err, gameData) {
      if (err) console.log(err);
      if (submitted.submitted === true) {
        for (var i = 0; i < submitted.hand.length; i++) {
          if (submitted.submission.hashtag === submitted.hand[i]) {
            submitted.hand[i] = gameData.hashtags.pop();
          }
        }
      }
      obj.set('players.' + submitted.userGlobalId, submitted);
      obj.save(function(err, doc) {
        if (err) {
          console.error(err);
        } else {
          if (submitted.submitted) {
            if(clients[submitted.userGlobalId]){
              clients[submitted.userGlobalId].broadcast.to(gameId).emit('otherPlayerSubmit');
            }
          }
          res.writeHead(204);
          res.end();
        }
      });
      gameData.save(function(err) {
        if (err) console.log(err);
      });
    });
  });
}

exports.roundChange = function(req, res) {
  console.log('judge goes here');
  var gameId = req.params.id;
  var submitted = req.body;
  var oldJudge;


  Game.findById(gameId, function(err, obj) {
    GameData.findById(obj.gameData, function(err, gameData) {
      var newPrompt = gameData.prompts.pop();
      obj.set('prompt', newPrompt);
      obj.save(function(err) {
        if (err) console.log(err);
      })
      gameData.save(function(err) {
        if (err) console.log(err);
      });

    });
    _.each(obj.players, function(item) {
      obj.set('players.' + item.userGlobalId + '.continued', false);
      obj.set('players.' + item.userGlobalId + '.submitted', false);
      obj.set('players.' + item.userGlobalId + '.submission', {});
      if (item.isJ) {
        obj.set('players.' + item.userGlobalId + '.isJ', false);
        oldJudge = item.userGlobalId;
        console.log('how many times');
      }
      if (submitted.previousRound.winner === item.username) {
        obj.set('players.' + item.userGlobalId + '.score', item.score + 1);
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
    obj.set('players.' + newJudge + '.isJ', true);
    obj.set('judge', judge);
    obj.set('round', currentround);
    obj.set('gameEnd', true);
    obj.set('numberOfSub', 0);
    obj.set('previousRound', submitted.previousRound);
    obj.save(function(err, doc) {
      if (err) console.error(err);
      res.writeHead(204);
      res.end();
      if(clients[oldJudge]){
        clients[oldJudge].broadcast.to(gameId).emit('judgeSelect');
      }
    });
  });
};