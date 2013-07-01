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
        player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
        if(flag){
          player.isJ = true;
          game.judge = item.username;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game.players.push(player);
        game.title = 'dummyGame1';
        game.prompt = 'I\'m building up an army of _______';
        game.round = 1;
        User.findById(item._id, function(err, obj){
          obj.games.push({gameId: game._id, judge: game.judge, prompt: game.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}], title: 'dummyGame1'});
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
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
        player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
        if(flag){
          player.isJ = true;
          game1.judge = item.username;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game1.players.push(player);
        game1.title = 'dummyGame1';
        game1.prompt = 'I\'m building up an army of _______';
        game1.round = 1;
        User.findById(item._id, function(err, obj){
          obj.games.push({gameId: game1._id, judge: game1.judge, prompt: game1.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}], title: 'dummyGame1'});
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
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
        player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
        if(flag){
          player.isJ = true;
          game2.judge = item.username;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game2.players.push(player);
        game2.title = 'dummyGame1';
        game2.prompt = 'I\'m building up an army of _______';
        game2.round = 1;
        User.findById(item._id, function(err, obj){
          obj.games.push({gameId: game2._id, judge: game2.judge, prompt: game2.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}], title: 'dummyGame1'});
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
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
        player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
        if(flag){
          player.isJ = true;
          game3.judge = item.username;
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        game3.players.push(player);
        game3.title = 'dummyGame1';
        game3.prompt = 'I\'m building up an army of _______';
        game3.round = 1;
        User.findById(item._id, function(err, obj){
          obj.games.push({gameId: game3._id, judge: game3.judge, prompt: game3.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg"}], title: 'dummyGame1'});
          obj.save(function(err){
            if(err) console.log(err);
          })
        });
      });
      game3.save(function(err){
        if(err) console.log(err);
      });
    });
  });
};