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
    res.writeHead(204);
    res.end();
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
        console.log("WAITING ON", invite.waitingOn);
        if (invite.waitingOn > 1) {
          invite.set('waitingOn', --invite.waitingOn);
          moveGameToPending(playersArr[i].user, inviteId, invite.title, invite.waitingOn, res);
        } else if (invite.waitingOn === 1) {
          var userIds = [];
          userIds.push(invite.gameAdmin);
          userIds.push(invite.player2.user);
          userIds.push(invite.player3.user);
          userIds.push(invite.player4.user);
          createGame(userIds, inviteId, invite.title);
        }

      }
    }
    invite.save(function(err, invite) {
      if (err) console.log(err);
      res.writeHead(204);
      res.end();
    });
  });
};

//If waitingOn === 1:
//Create a game instead of move game to pending 
//Add that game to every user involved in game
// Remove pending game from every user including game admin except for one who is currently accepting
//Then clients[userId].emit on each user- in the save callback of that user
var createGame = function(userIds, inviteId, inviteTitle) {
  var player = {};
  var game = new Game();
  game.title = inviteTitle;
  game.prompt = "When I woke up from a nap my siginificant other had ___";
  game.round = 1;
  game.numberOfSub = 0;
  game.players = {};

  //Add players to game
  for (var i = 0; i < userIds.length; i++) {
    addPlayerToGame(userIds[i], game, i);
  }

  game.set('players', game.players);

  //Save the game
  game.save(function(err) {
    if (err) console.log(err);
    for (var i = 0; i < userIds.length; i++) {
      removePendingGameFromUser(userIds[i], inviteId);
      addGameToUser(userIds[i], game);
    }
  });
}

var addPlayerToGame = function(userId, game, index) {
  User.findById(userId, function(err, user) {
    if (err) console.log(err);
    player = {};
    player.userGlobalId = userId;
    player.submitted = false;
    player.score = 0;
    player.username = user.username;
    player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
    if(index === 0){
      player.isJ = true;
      game.judge = {username: user.username, avatarURL:user.avatarURL};
    }
    else{
      player.isJ = false;
    }
    game.players[userId] = player;
  });
}

  var addGameToUser = function(userId, game) {
    User.findById(userId, function(err, user) {
      if (err) console.log(err);
      user.games.push(game);
      console.log("PLAYERS ", game.players)
      user.set('games', user.games);
 

      user.save(function(err) {
        if (err) console.log(err);
        console.log("USER GAMES", user.games);
        if(clients[userId]){
          clients[userId].emit('changeInUser');
        }
      })
    })
  }

  var removePendingGameFromUser = function(userId, inviteId) {
    User.findById(userId, function(err, user) {
      if (err) console.log(err);
      var pendingGames = user.pendingGames;
      //splice this pending game put of user's pending games array:
      for (var i = 0; i < pendingGames.length; i++) {
        if (pendingGames[i].invite.toString() === inviteId) {
          pendingGames.splice(i, 1);
          user.set('pendingGames', pendingGames);
        }
      }
    });
  }



  var moveGameToPending = function(userId, inviteId, title, waitingOn, res) {
    User.findById(userId, function(err, user) {
      for (var i = 0; i < user.invites.length; i++) {
        if (user.invites[i].invite.toString() === inviteId) {
          user.invites.splice(i, 1);
          user.set('invites', user.invites);
        }
      };
      var pendingGames = [];
      pendingGames.push({
        invite: inviteId,
        title: title,
        waitingOn: waitingOn
      });
      user.set('pendingGames', pendingGames);
      user.save(function(err) {
        if (err) console.log(err);

      });
    });
  }