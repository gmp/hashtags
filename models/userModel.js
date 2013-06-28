var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  accessToken: String,
  looking: {type:Boolean, default: false},
  avatarURL: String,
  games: []
});

module.exports = mongoose.model('Users', UserSchema);
