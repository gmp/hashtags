var User = require('../models/userModel.js'),
    Game = require('../models/gameModel.js'),
    _ = require('underscore');


module.exports = function(){
  var player, game, game1, game2, game3, query;
  var flag;
  Game.remove({}, function(){
    game = new Game();
    User.find({}, function(err, obj){
      flag = true;
      _.each(obj, function(item){
        player = {};
        player.userGlobalId = item._id;
        player.hand = ['#yolo', '#yolo', '#yolo', '#yolo', '#yolo'];
        if(flag){
          player.isJ = true;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game.players.push(player);
        User.findById(item._id, function(err, obj){
          obj.games.push(game._id);
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
      game.title = 'dummyGame';
      game.prompt = 'I\'m building up an army of _______';
      game.round = 1;
      game.save(function(err){
        if(err) console.log(err);
      });
    });
    game1 = new Game();
    User.find({}, function(err, obj){
      flag = true;
      _.each(obj, function(item){
        player = {};
        player.userGlobalId = item._id;
        player.hand = ['#yolo', '#yolo', '#yolo', '#yolo', '#yolo'];
        if(flag){
          player.isJ = true;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game1.players.push(player);
        User.findById(item._id, function(err, obj){
          obj.games.push(game1._id);
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
      game1.title = 'dummyGame';
      game1.prompt = 'I\'m building up an army of _______';
      game1.round = 1;
      game1.save(function(err){
        if(err) console.log(err);
      });
    });
    game2 = new Game();
    User.find({}, function(err, obj){
      flag = true;
      _.each(obj, function(item){
        player = {};
        player.userGlobalId = item._id;
        player.hand = ['#yolo', '#yolo', '#yolo', '#yolo', '#yolo'];
        if(flag){
          player.isJ = true;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game2.players.push(player);
        User.findById(item._id, function(err, obj){
          obj.games.push(game2._id);
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
      game2.title = 'dummyGame';
      game2.prompt = 'I\'m building up an army of _______';
      game2.round = 1;
      game2.save(function(err){
        if(err) console.log(err);
      });
    });
    game3 = new Game();
    User.find({}, function(err, obj){
      flag = true;
      _.each(obj, function(item){
        player = {};
        player.userGlobalId = item._id;
        player.hand = ['#yolo', '#yolo', '#yolo', '#yolo', '#yolo'];
        if(flag){
          player.isJ = true;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game3.players.push(player);
        User.findById(item._id, function(err, obj){
          obj.games.push(game3._id);
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
      game3.title = 'dummyGame';
      game3.prompt = 'I\'m building up an army of _______';
      game3.round = 1;
      game3.save(function(err){
        if(err) console.log(err);
      });
    });
  });
};