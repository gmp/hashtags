var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  accessToken: String,
  looking: false,
  avatarURL: String
});

module.exports = mongoose.model('Users', UserSchema);