var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InviteSchema = new Schema({
  title     : String,
  gameAdmin : String,
  player2   : {user: String, accepted: {type: Boolean, default: false}},
  player3   : {user: String, accepted: {type: Boolean, default: false}},
  player4   : {user: String, accepted: {type: Boolean, default: false}},
});

module.exports = mongoose.model('Invites', InviteSchema);