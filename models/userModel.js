var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  username: String,
  name: Object,
  accessToken: String,
  looking: {type:Boolean, default: false},
  avatarURL: String,
  games: [{gameId: { type: ObjectId, ref: 'Games' }, judge: Object, prompt: String, players: [{username: String, avatarURL: String, score: Number}], title: String}],
  invites: [{invite: { type: ObjectId, ref: 'Invites' }, author: String}],
  pendingGames: [{invite: { type: ObjectId, ref: 'Invites' }, title: String, waitingOn: Number, declined: Boolean}]
});


UserSchema.index({username: 1});

module.exports = mongoose.model('Users', UserSchema);
