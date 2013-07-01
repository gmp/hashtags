var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  username: String,
  accessToken: String,
  looking: {type:Boolean, default: false},
  avatarURL: String,
  games: [{gameId: { type: ObjectId, ref: 'Games' }, gameAdmin: String, title: String}],
  invites: [{invite: { type: ObjectId, ref: 'Invites' }, author: String}],
  pendingGames: [{invite: { type: ObjectId, ref: 'Invites' }, author: String}]
});

module.exports = mongoose.model('Users', UserSchema);
