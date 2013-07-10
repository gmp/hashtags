var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InviteSchema = new Schema({
  title     : String,
  author    : String,
  waitingOn : {type: Number, default: 3},
  gameAdmin : {user: String, username: String, avatarURL: String},
  player2   : {user: String, username: String, avatarURL: String, accepted: {type: String, default: 'waiting'}}, //or accepted or declined
  player3   : {user: String, username: String, avatarURL: String, accepted: {type: String, default: 'waiting'}},
  player4   : {user: String, username: String, avatarURL: String, accepted: {type: String, default: 'waiting'}}
});

module.exports = mongoose.model('Invites', InviteSchema);
