var User = require('../models/userModel.js'),
    _ = require('underscore'),
    Invite = require('../models/inviteModel.js'),
    clients = require('../config/socketEvents.js').clients;

exports.create = function(req, res){
  var obj = req.body;
  var invite = new Invite();
  invite.title = obj.title;
  invite.author = obj.author;
  invite.gameAdmin = obj.gameAdmin;
  invite.player2 = {user: obj.player2, accepted: 'waiting'};
  invite.player3 = {user: obj.player3, accepted: 'waiting'};
  invite.player4 = {user: obj.player4, accepted: 'waiting'};
  _.each(obj, function(value, key){
    console.log(key, value);
    if(key !== 'title'  && key !== 'author'){
      User.findById(value, function(err, obj){
        if(err) console.log(err);
        if(key === 'gameAdmin'){
          if(!obj.pendingGames){
            obj.pendingGames = [];
          }
          obj.pendingGames.push({invite: invite._id, author: invite.author, title: invite.title});
        } else {
          obj.invites.push({invite: invite._id, author: invite.author});
          if(clients[obj._id]){
            clients[obj._id].emit('changeInUser');
          }
        }
        obj.save(function(err){
          if(err) console.log(err);
        });
      });
    }
  });
  invite.save(function(err){
    if(err) console.log(err);
    res.writeHead(204);
    res.end();
  });
};