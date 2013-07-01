var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InviteSchema = new Schema({
  title     : String,
  author    : String,
  gameAdmin : String,
  player2   : {user: String, accepted: {type: String, default: 'waiting'}},
  player3   : {user: String, accepted: {type: String, default: 'waiting'}},
  player4   : {user: String, accepted: {type: String, default: 'waiting'}},
});

module.exports = mongoose.model('Invites', InviteSchema);