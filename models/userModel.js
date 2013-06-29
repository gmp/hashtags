var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  username: String,
  accessToken: String,
  looking: {type:Boolean, default: false},
  avatarURL: String,
  games: [{ type: ObjectId, ref: 'Games' }],
  invites: [{invite: { type: ObjectId, ref: 'Invites' }, author: { type: ObjectId, ref: 'Users' }}] 
});

module.exports = mongoose.model('Users', UserSchema);
