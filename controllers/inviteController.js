var User = require('../models/userModel.js'),
    _ = require('underscore'),
    Invite = require('../models/inviteModel.js'),
    GameData = require('../models/gameDataModel.js'),
    Game = require('../models/gameModel.js'),
    hashtags = require('../data/hashtags.js'),
    prompts = require('../data/prompts.js'),
    clients = require('../config/socketEvents.js').clients;


exports.create = function(req, res) {
  var obj = req.body;
  var invite = new Invite();
  invite.set('title', obj.title);
  invite.set('author', obj.author);
  invite.set('waitingOn', 3);
  invite.set('gameAdmin', obj.gameAdmin);
  invite.set('player2', obj.player2);
  invite.set('player3', obj.player3);
  invite.set('player4', obj.player4);
  invite.save(function (err){
    if(err) console.log(err);
    _.each(obj, function(value, key){
      if(key !== 'title'  && key !== 'author' && key !== 'waitingOn'){
        User.findById(value.user, function(err, obj){
          if(err) console.log(err);
          if(key === 'gameAdmin'){
            if(!obj.pendingGames){
              obj.pendingGames = [];
            }
            obj.pendingGames.push({invite: invite._id, title: invite.title, waitingOn: 3});
          } else {
            if(!obj.invites){
              obj.invites = [];
            }
            obj.invites.push({invite: invite._id, author: invite.author});
          }
          obj.save(function(err){
            if(err){
              console.log(err);
            }  else if(clients[obj._id]){
              clients[obj._id].emit('changeInUser');
            }
          });
        });
      }
    });
    res.writeHead(204);
    res.end();
  });
};

exports.accept = function(req, res){
  var inviteId = req.body.inviteId;
  var userId  = req.body.userId;
  Invite.findById(inviteId, function (err, invite){

    var playersArr = [];
    playersArr.push(invite.player2);
    playersArr.push(invite.player3);
    playersArr.push(invite.player4);

    for(var i = 0; i < playersArr.length; i ++){
      if(playersArr[i].user === userId){
        if(invite.waitingOn > 1){
          invite.set('player' + (i+2) +'.accepted', 'accepted');
          invite.set('waitingOn', invite.waitingOn - 1);
          moveGameToPending(playersArr[i].user, inviteId, invite.title, invite.waitingOn, res);
        } else {
          playersArr.push(invite.gameAdmin);
          createGame(inviteId, playersArr, invite.title, userId, res);
        }

      }
    }
    invite.save(function(err, invite) {
      if (err) console.log(err);

    });
  });
};

exports.decline = function(req, res){
  console.log("*****INVITE DECLINE******");
}


var moveGameToPending = function (userId, inviteId, title, waitingOn, res){
  User.findById(userId, function (err, user){
    var newInvites = [];
    for(var i = 0; i < user.invites.length; i ++){
      if(user.invites[i].invite.toString() !== inviteId){
        newInvites.push(user.invites[i]);
      }
    };
    user.set('invites', newInvites);
    var pendingGames = [];
    for(var i = 0; i < user.pendingGames.length; i ++){
      if(user.pendingGames[i].invite.toString() !== inviteId){
        pendingGames.push(user.pendingGames[i]);
      }
    };
    pendingGames.push({
      invite: inviteId,
      title: title,
      waitingOn: waitingOn
    });
    user.set('pendingGames', pendingGames);
    user.save(function(err) {
      if (err) console.log(err);
      res.writeHead(204);
      res.end();

    });
  });
};

var createGame = function (invite, players, title, userId, res){
  var game = new Game();
  var gameData = new GameData();
  var allPrompt = _.shuffle(prompts);
  var thisPrompt = allPrompt.pop();
  gameData.set('prompts', allPrompt.slice(0, 37));
  gameData.set('gameId', game._id);
  var tags = _.shuffle(hashtags);
  var judgeArr = [];
  game.set('title', title);
  game.set('gameData', gameData._id);
  game.set('prompt', thisPrompt);
  game.set('round', 0);
  game.set('numberOfSub', 0);
  game.set('judge', {username: players[0].username, avatarURL: players[0].avatarURL, userGlobalId: players[0].user});
  var playersHash = {};
  for(var i = 0; i < players.length; i ++){
    judgeArr.push(players[i].user);
    playersHash[players[i].user] = {};
    playersHash[players[i].user].username = players[i].username;
    playersHash[players[i].user].avatarURL = players[i].avatarURL;
    playersHash[players[i].user].userGlobalId = players[i].user;
    playersHash[players[i].user].submitted = false;
    playersHash[players[i].user].submission = {};
    playersHash[players[i].user].continued = true;
    playersHash[players[i].user].score = 0;
    playersHash[players[i].user].isJ = false;
    playersHash[players[i].user].hand = tags.splice(0, 5);
  }
  gameData.set('hashtags', tags);
  playersHash[judgeArr[0]].isJ = true;
  gameData.save(function (err){
    if(err) console.log(err);
  });
  game.set('judgingOrder', judgeArr);
  game.set('players', playersHash);
  game.save(function (err, newGame){
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
    _.each(keys, function (pId){
      var player = {};
      player.username = newGame.players[pId].username;
      player.avatarURL = newGame.players[pId].avatarURL;
      player.score = 0;
      userGame.players.push(player);
    });
    for(var i = 0; i < keys.length; i ++){
      User.findById(keys[i], function (err, user){
        if(err) console.log(err);
        var newArr = [];
        if(user._id.toString() === userId){
          for(var i = 0; i < user.invites.length; i ++){
            if(user.invites[i].invite.toString() !== invite){
              newArr.push(user.invites[i]);
            }
          }
          user.set('invites', newArr);
          user.games.push(userGame);
          user.save(function (err){
            res.writeHead(204);
            res.end();
          });
        } else {
          for(var i = 0; i < user.pendingGames.length; i ++){
            if(user.pendingGames[i].invite.toString() !== invite){
              newArr.push(user.invites[i]);
            }
          }
          user.set('pendingGames', newArr);
          user.games.push(userGame);
          user.save(function (err, user){
            if (clients[user._id]) {
              clients[user._id].emit('changeInUser');
            }
          });
        }
      });
    }
  });
};



