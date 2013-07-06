var User = require('../models/userModel.js'),
  Game = require('../models/gameModel.js'),
  _ = require('underscore'),
  Invite = require('../models/inviteModel.js'),
  clients = require('../config/socketEvents.js').clients;

exports.create = function(req, res) {
  var obj = req.body;
  var invite = new Invite();
  invite.title = obj.title;
  invite.author = obj.author;
  invite.gameAdmin = obj.gameAdmin;
  invite.player2 = {
    user: obj.player2,
    accepted: 'waiting'
  };
  invite.player3 = {
    user: obj.player3,
    accepted: 'waiting'
  };
  invite.player4 = {
    user: obj.player4,
    accepted: 'waiting'
  };
  _.each(obj, function(value, key) {
    console.log(key, value);
    if (key !== 'title' && key !== 'author') {
      User.findById(value, function(err, obj) {
        if (err) console.log(err);
        if (key === 'gameAdmin') {
          if (!obj.pendingGames) {
            obj.pendingGames = [];
          }
          obj.pendingGames.push({
            invite: invite._id,
            title: invite.title,
            waitingOn: 3
          });
        } else {
          if (!obj.invites) {
            obj.invites = [];
          }
          obj.invites.push({
            invite: invite._id,
            author: invite.author
          });
          if (clients[obj._id]) {
            clients[obj._id].emit('changeInUser');
          }
        }
        obj.save(function(err) {
          if (err) console.log(err);
        });
      });
    }
  });
  invite.save(function(err) {
    if (err) console.log(err);
  });
};

exports.accept = function(req, res) {
  console.log(req.body)
  var inviteId = req.body.inviteId;
  var userId = req.body.userId;
  //grab invite from database
  Invite.findById(inviteId, function(err, invite) {
    var playersArr = [];
    playersArr.push(invite.player2);
    playersArr.push(invite.player3);
    playersArr.push(invite.player4);
    for (var i = 0; i < playersArr.length; i++) {
      if (playersArr[i].user === userId) {
        invite.set('player' + (i + 2) + '.accepted', 'accepted');
        if (invite.waitingOn > 1) {
          invite.set('waitingOn', invite.waitingOn - 1);
          moveGameToPending(playersArr[i].user, inviteId, invite.title, invite.waitingOn, res);
        } else if (invite.waitingOn === 1) {
          var userIds = [];
          userIds.push(invite.gameAdmin);
          userIds.push(invite.player2.user);
          userIds.push(invite.player3.user);
          userIds.push(invite.player4.user);
          createGame(userId, userIds, inviteId, invite.title, res);
        }

      }
    }
    invite.save(function(err, invite) {
      if (err) console.log(err);

    });
  });
};

//If waitingOn === 1:
//Create a game instead of move game to pending 
//Add that game to every user involved in game
// Remove pending game from every user including game admin except for one who is currently accepting
//Then clients[userId].emit on each user- in the save callback of that user
var createGame = function(userId, userIds, inviteId, inviteTitle, res) {
  var game = new Game();
  game.set('title', inviteTitle);
  game.set('prompt', "Yesterday I took an epic __");
  game.set('round', 1);
  game.set('numberOfSub', 0);
  var players = {};
  var playerIndex = 0;

  //Add players to game
  for (var i = 0; i < userIds.length; i++) {
    User.findById(userIds[i], function(err, user) {
      if (err) console.log(err);

      //*******Add user as a player************
      player = {};
      player.userGlobalId = user._id;
      player.submitted = false;
      player.score = 0;
      player.username = user.username;
      player.continued = true;
      player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
      if (playerIndex === 0) {
        player.isJ = true;
        game.judge = {
          username: user.username,
          avatarURL: user.avatarURL
        };
      } else {
        player.isJ = false;
      }
      players[user._id] = player;

      //Remove invitation from the user that just accepted, which was the last
 
      if (user._id.toString() === userId.toString()) {
        var newInvites = [];
        for (var i = 0; i < user.invites.length; i++) {
          if (!(user.invites[i].invite.toString() === inviteId.toString())) {
            newInvites.push(user.invites[i])
          }
        }
        user.set('invites', newInvites);
        user.save(function(err){
          
        })

      }
      if (playerIndex === 3) {
        for (var i = 0; i < userIds.length; i++) {
          addGameToUser(userIds[i], game, inviteId, res);
        }
        game.players = players;

        game.save(function(err) {
          if (err) console.log(err);
        });
      }
      playerIndex++;
    });
  }
};

var addGameToUser = function(userId, game, inviteId, res) {
  User.findById(userId, function(err, user) {
    if (err) console.log(err);
    var userGame = {};
    var games = [];
    userGame.gameId = game._id;
    userGame.judge = game.judge;
    userGame.prompt = game.prompt;
    var userPlayers = [];
    for (var playerId in game.players) {
      var userPlayer = {};
      userPlayer.username = game.players[playerId].username;
      userPlayer.avatarURL = game.players[playerId].avatarURL;
      userPlayer.score = game.players[playerId].score;
      userPlayers.push(userPlayer);

    }
    userGame.players = userPlayers;
    userGame.title = game.title;

    //REMOVE PENDING GAMES
    var pendingGames = user.pendingGames;
    //splice this pending game put of user's pending games array:
    for (var i = 0; i < pendingGames.length; i++) {
      if (pendingGames[i].invite.toString() === inviteId) {
        pendingGames.splice(i, 1);
        user.set('pendingGames', pendingGames);
      }
    }


    user.games.push(userGame);
  
    user.save(function(err) {
      if (err) console.log(err);

      if (clients[user._id]) {
        clients[userId].emit('changeInUser');
 
      }
    })
  })
}


var moveGameToPending = function(userId, inviteId, title, waitingOn, res) {
  User.findById(userId, function(err, user) {
    for (var i = 0; i < user.invites.length; i++) {
      if (user.invites[i].invite.toString() === inviteId) {
        user.invites.splice(i, 1);
        user.set('invites', user.invites);
      }
    }
    var pendingGames = [];
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
}