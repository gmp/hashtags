var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  accessToken: String,
  looking: false,
  avatarURL: String,
  games: []
});

module.exports = mongoose.model('Users', UserSchema);