var User = require('../models/userModel.js'),
    Game = require('../models/gameModel.js'),
    GameData = require('../models/gameDataModel.js')
    prompts = require('../data/prompts.js'),
    hashtags = require('../data/hashtags.js'),
    _ = require('underscore');


module.exports = function(){
  var player, game, game1, game2, game3, query, gameData, promptList, prompt, hand;
  var flag;
  Game.remove({}, function(){
    game = new Game();
    gameData = new GameData();
    gameData.hashtags = _.shuffle(hashtags);
    promptList = _.shuffle(prompts);
    promptList = promptList.slice(0, 37);
    gameData.prompts = promptList;
    gameData.gameId = game._id;
    game.gameData = gameData._id;
    gameData.save(function(err){
      if(err) console.log(err);
    });
    User.find({}, function(err, obj){
      flag = true;
      _.each(obj, function(item){
        player = {};
        player.userGlobalId = item._id;
        hand = gameData.hashtags.splice(0, 5);
        player.hand = hand;
        if(flag){
          player.isJ = true;
          game.judge = {username: item.username, avatarURL:item.avatarURL};
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.continued = true;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        if(!game.players){
          game.players = {};
        }
        game.judgingOrder.push(player.userGlobalId);
        game.players[item._id] = player;
        game.title = 'dummyGame1';
        game.numberOfSub = 0;
        game.prompt = gameData.prompts.pop();
        game.round = 1;
        User.findById(item._id, function(err, obj){
          obj.games.push({gameId: game._id, judge: game.judge, prompt: game.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}], title: game.title});
          obj.save(function(err){
            if(err) console.log(err);
          });
        });
      });
      game.save(function(err){
        if(err) console.log(err);
      });
    });
    game2 = new Game();
    gameData2 = new GameData();
    gameData2.hashtags = _.shuffle(hashtags);
    promptList = _.shuffle(prompts);
    promptList = promptList.slice(0, 37);
    gameData2.prompts = promptList;
    gameData2.gameId = game._id;
    game2.gameData = gameData2._id;
    gameData.save(function(err){
      if(err) console.log(err);
    });
    User.find({}, function(err, obj){
      flag = true;
      _.each(obj, function(item){
        player = {};
        player.userGlobalId = item._id;
        hand = gameData2.hashtags.splice(0, 5);
        player.hand = hand;
        if(flag){
          player.isJ = true;
          game2.judge = {username: item.username, avatarURL:item.avatarURL};
          flag = false;
        } else {
          player.isJ = false;
        }
        player.submitted = false;
        player.continued = true;
        player.score = 0;
        player.avatar = item.avatarURL;
        player.username = item.username;
        if(!game2.players){
          game2.players = {};
        }
        game2.judgingOrder.push(player.userGlobalId);
        game2.players[item._id] = player;
        game2.title = 'dummyGame2';
        game2.numberOfSub = 0;
        game2.prompt = gameData2.prompts.pop();
        game2.round = 1;
        User.findById(item._id, function(err, obj){
          obj.games.push({gameId: game2._id, judge: game2.judge, prompt: game2.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}], title: game2.title});
          obj.save(function(err){
            if(err) console.log(err);
          });
        });
      });
      game2.save(function(err){
        if(err) console.log(err);
      });
    });
    // game1 = new Game();
    // User.find({}, function(err, obj){
    //   flag = true;
    //   _.each(obj, function(item){
    //     player = {};
    //     player.userGlobalId = item._id;
    //     player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
    //     if(flag){
    //       player.isJ = true;
    //       game1.judge = {username: item.username, avatarURL : item.avatarURL};
    //       flag = false;
    //     } else {
    //       player.isJ = false;
    //     }
    //     player.submitted = false;
    //     player.score = 0;
    //     player.avatar = item.avatarURL;
    //     player.username = item.username;
    //     if(!game1.players){
    //       game1.players = {};
    //     }
    //     game1.players[item._id] = player;
    //     game1.judgingOrder.push(player.userGlobalId);
    //     game1.numberOfSub = 0;
    //     game1.title = 'dummyGame2';
    //     game1.prompt = 'I\'m building up an army of _______';
    //     game1.round = 1;
    //     User.findById(item._id, function(err, obj){
    //       obj.games.push({gameId: game1._id, judge: game1.judge, prompt: game1.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}], title: game1.title});
    //       obj.save(function(err){
    //         if(err) console.log(err);
    //       });
    //     });
    //   });
    //   game1.save(function(err){
    //     if(err) console.log(err);
    //   });
    // });
    // game2 = new Game();
    // User.find({}, function(err, obj){
    //   flag = true;
    //   _.each(obj, function(item){
    //     player = {};
    //     player.userGlobalId = item._id;
    //     player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
    //     if(flag){
    //       player.isJ = true;
    //       game2.judge = {username: item.username, avatarURL:item.avatarURL};
    //       flag = false;
    //     } else {
    //       player.isJ = false;
    //     }
    //     player.submitted = false;
    //     player.continued = true;
    //     player.score = 0;
    //     player.avatar = item.avatarURL;
    //     player.username = item.username;
    //     if(!game2.players){
    //       game2.players = {};
    //     }
    //     game2.players[item._id] = player;
    //     game2.numberOfSub = 0;
    //     game2.judgingOrder.push(player.userGlobalId);
    //     game2.title = 'dummyGame3';
    //     game2.prompt = 'I\'m building up an army of _______';
    //     game2.round = 1;
    //     User.findById(item._id, function(err, obj){
    //       obj.games.push({gameId: game2._id, judge: game2.judge, prompt: game2.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}], title: game2.title});
    //       obj.save(function(err){
    //         if(err) console.log(err);
    //       });
    //     });
    //   });
    //   game2.save(function(err){
    //     if(err) console.log(err);
    //   });
    // });
    // game3 = new Game();
    // User.find({}, function(err, obj){
    //   flag = true;
    //   _.each(obj, function(item){
    //     player = {};
    //     player.userGlobalId = item._id;
    //     player.hand = ['#yolo', '#omg', '#kitty', '#jj_forum', '#jaja'];
    //     if(flag){
    //       player.isJ = true;
    //       game3.judge = {username: item.username, avatarURL:item.avatarURL};
    //       flag = false;
    //     } else {
    //       player.isJ = false;
    //     }
    //     player.submitted = false;
    //     player.continued = true;
    //     player.score = 0;
    //     player.avatar = item.avatarURL;
    //     player.username = item.username;
    //     if(!game3.players){
    //       game3.players = {};
    //     }
    //     game3.players[item._id] = player;
    //     game3.title = 'dummyGame4';
    //     game3.judgingOrder.push(player.userGlobalId);
    //     game3.numberOfSub = 0;
    //     game3.prompt = 'I\'m building up an army of _______';
    //     game3.round = 1;
    //     User.findById(item._id, function(err, obj){
    //       obj.games.push({gameId: game3._id, judge: game3.judge, prompt: game3.prompt, players:[{username: "hifelight", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "ericrius1", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "gmp5", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}, {username: "banjolina_jolie", avatarURL:"http://images.ak.instagram.com/profiles/profile_178079200_75sq_1372354431.jpg", score: 0}], title: game3.title});
    //       obj.save(function(err){
    //         if(err) console.log(err);
    //       });
    //     });
    //   });
    //   game3.save(function(err){
    //     if(err) console.log(err);
    //   });
    // });
  });
};