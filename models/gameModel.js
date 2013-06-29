var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  title  : String,
  prompt : String,
  round  : Number,
  gameEnd : {type:Boolean, default: false},
  judge  : {avatarURL: String, userGlobalId: String},
  players : [{
    hand: [String],
    score: Number,
    username: String,
    avatarURL: String,
    isJ: {type: Boolean, default: false},
    submitted: {type: Boolean, default: false},
    submission: {url: String, hashtag: String},
    userGlobalId: { type: ObjectId, ref: 'User' },
    continued: {type: Boolean, default: false}
  }],
  previousRound : [{ type: ObjectId, ref: 'PrevRound'}]
});

module.exports = mongoose.model('Games', GameSchema);