var Invite = require('../models/inviteModel.js');

module.exports = function (){
  Invite.remove({}, function (err) {
    if(err) console.log(err);
  });
}