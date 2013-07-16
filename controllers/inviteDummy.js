var Invite = require('../models/inviteModel.js');
var User = require('../models/userModel.js');

module.exports = function (){
  Invite.remove({}, function (err) {
    invite = new Invite();
    User.find({}, function (err, users){
      invite.title = '#1 Best Game';
      flag = true;
      console.log(users);
      for (var i = 0; i < users.length; i ++){
        if(flag){
          invite.author = users[i].username;
          invite.gameAdmin = {user: users[i]._id, username: users[i].username, avatarURL: users[i].avatarURL};
          flag = false;
          User.update({'username' : users[i].username}, {$push: {pendingGames: {invite: invite._id, title: invite.title, waitingOn: 3}}}, function(err){
            if(err) console.log(err);
          });
        } else {
          invite['player' + (i+1)] = {user: users[i]._id, username: users[i].username, avatarURL: users[i].avatarURL, accepted: 'waiting'};
          User.update({'username' : users[i].username}, {$push: {invites: {invite: invite._id, author: invite.author}}}, function (err){
            if(err)console.log(err);
          });
        }
      }
      invite.set('player3.accepted', 'declined');
      invite.save(function (err, invite){
        if(err){
          console.log(err);
        }
      });
    });
  });
}