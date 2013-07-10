var User = require('../models/userModel.js');
var Game = require('../models/gameModel.js');
var GameData = require('../models/gameDataModel.js');
var hashtags = require('../data/hashtags.js');
var prompts = require('../data/prompts.js');
var clients = require('../config/socketEvents.js').clients;
var _ = require('underscore');

exports.join = function(req, res) {
  var userId = req.params.id;

  var switchLooking = function (err, obj) {
    if(err) {
      console.log(err);
      return;
    } else {
      var looking = obj.get('looking');
      if(!looking) {
        obj.set('looking', true);
        obj.pendingGames.push({title: '#1 Best Random Game'});
      }
      obj.save(function (err) {
        if(err) {
          console.log(err)
        } else {
          User.find({}).where('looking', 'true').exec(makeGame);
        }
      });
    }
  };

  var makeGame = function(err, obj) {
    if(err) {
      console.log(err);
    } else {
      if(obj.length === 4) {
        createGame(obj);
      } else {
        res.send(userId);
      }
    };
  };

  var createGame = function(players) {
    var game = new Game();
    var gameData = new GameData();
    var allPrompt = _.shuffle(prompts);
    var thisPrompt = allPrompt.pop();
    gameData.set('prompts', allPrompt.slice(0, 37));
    gameData.set('gameId', game._id);
    var tags = _.shuffle(hashtags);
    var judgeArr = [];
    game.set('title', '#1 Best Random Game');
    game.set('gameData', gameData._id);
    game.set('prompt', thisPrompt);
    game.set('round', 0);
    game.set('numberOfSub', 0);
    game.set('judge', {username: players[0].username, avatarURL: players[0].avatarURL, userGlobalId: players[0].user});
    var playersHash = {};
    for(var i = 0; i < players.length; i ++) {
      judgeArr.push(players[i]._id);
      playersHash[players[i]._id] = {};
      playersHash[players[i]._id].username = players[i].username;
      playersHash[players[i]._id].avatarURL = players[i].avatarURL;
      playersHash[players[i]._id].userGlobalId = players[i]._id;
      playersHash[players[i]._id].submitted = false;
      playersHash[players[i]._id].submission = {};
      playersHash[players[i]._id].continued = true;
      playersHash[players[i]._id].score = 0;
      playersHash[players[i]._id].isJ = false;
      playersHash[players[i]._id].hand = tags.splice(0, 5);
    }
    gameData.set('hashtags', tags);
    playersHash[judgeArr[0]].isJ = true;
    game.set('judgingOrder', judgeArr);
    game.set('players', playersHash);
    gameData.save(function (err) {
      if(err) {
        console.log(err);
      } else {
        game.save(function (err, newGame) {
          var keys = newGame.judgingOrder;
          var userGame = {};
          console.log(keys);
          userGame.gameId = newGame._id;
          userGame.judge = {};
          userGame.judge.username = newGame.judge.username;
          userGame.judge.avatarURL = newGame.judge.avatarURL;
          userGame.prompt = newGame.prompt;
          userGame.title = newGame.title;
          userGame.players = [];
          _.each(keys, function (pId) {
            var player = {};
            player.username = newGame.players[pId].username;
            player.avatarURL = newGame.players[pId].avatarURL;
            player.score = 0;
            userGame.players.push(player);
          });
          for(var i = 0; i < keys.length; i ++) {
            User.findById(keys[i], function (err, user) {
              if(err) {
                console.log(err);
              } else {
                var newArr = [];
                user.games.push(userGame);
                for(var i = 0; i < user.pendingGames.length; i ++) {
                  if(user.pendingGames[i].title !== '#1 Best Random Game') {
                    newArr.push(user.pendingGames[i]);
                  }
                }
                user.set('pendingGames', newArr);
                user.set('looking', false);
                user.save(function (err, user) {
                  if(err) console.log(err);
                  if(user._id === userId) {
                    res.send(userId);
                  } else {
                    if (clients[user._id]) {
                      clients[user._id].emit('changeInUser');
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  };
  User.findById(userId).exec(switchLooking);
}
