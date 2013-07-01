var Invite = require('../models/inviteModel.js');
var User = require('../models/userModel.js');

module.exports = function (){
  Invite.remove({}, function (err) {
    invite = new Invite();
    invite.title = '#1 Best Game';
    invite.author = 'gmp5';
    invite.gameAdmin = "51cc74bbb298b522c2000001";
    invite.player2 = {user: "51cc70e677ee79fcc1000001", accepted: 'waiting'};
    invite.player3 = {user: "51cc6e4854dd74c4c1000001", accepted: 'waiting'};
    invite.player4 = {user: "51cc710577ee79fcc1000002", accepted: 'waiting'};
    User.findById(invite.player2.user, function (err, obj){
      if(!obj.invites){
        obj.invites = [];
      }
      obj.invites.push({invite: invite._id, author: invite.author});
      obj.save(function (err){
        if(err) console.log(err);
      });
    });
    User.findById(invite.player3.user, function (err, obj){
      if(!obj.invites){
        obj.invites = [];
      }
      obj.invites.push({invite: invite._id, author: invite.author});
      obj.save(function (err){
        if(err) console.log(err);
      });
    });
    User.findById(invite.player4.user, function (err, obj){
      if(!obj.invites){
        obj.invites = [];
      }
      obj.invites.push({invite: invite._id, author: invite.author});
      obj.save(function (err){
        if(err) console.log(err);
      });
    });
    invite.save(function (err){
      if(err) console.log(err);
    })
  });
}