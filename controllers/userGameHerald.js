var _ = require('underscore');
var User = require('../models/userModel.js')

module.exports = function (doc, gameId) {
  var players = doc.get('players');
  _.each(players, function (player) {
    User.findById(player.userGlobalId, function (err, user) {
      var games = [];
      for(var i = 0; i < user.games.length; i ++) {
        if(user.games[i].gameId.toString() !== gameId) {
          games.push(user.games[i]);
        } else {
          user.games[i].judge = doc.get('judge');
          user.games[i].prompt = doc.get('prompt');
          user.games[i].title = doc.get('title');
          user.games[i].players = [];
          _.each(players, function (item) {
            var obj = {};
            obj.username = item.username;
            obj.avatarURL = item.avatarURL;
            obj.score = item.score;
            user.games[i].players.push(obj);
          });
          games.push(user.games[i]);
        }
      }
      user.set('games', games);
      user.save(function (err) {
        if(err) console.log(err);
      });
    });
  });
}