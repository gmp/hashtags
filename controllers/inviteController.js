var User = require('../models/userModel.js'),
    _ = require('underscore'),
    Invite = require('../models/inviteModel.js');

exports.create = function(req, res){
  var obj = req.body;
  var invite = new Invite();
  invite.title = obj.title;
  invite.gameAdmin = obj.gameAdmin;
  console.log(invite._id);
  invite.player2 = {user: obj.player2, accepted: false};
  invite.player3 = {user: obj.player3, accepted: false};
  invite.player4 = {user: obj.player4, accepted: false};
  _.each(obj, function(value, key){
    console.log(key, value);
    if(key !== 'title'){
      User.findById(value, function(err, obj){
        if(err) console.log(err);
        obj.invites.push({invite: invite._id, author: invite.gameAdmin});
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