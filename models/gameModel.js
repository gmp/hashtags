var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  title  : String,
  prompt : String,
  round  : Number,
  judge  : String,
  players : [{
  	hand: [String],
  	score: Number,
  	username: String,
    avatarURL: String,
    isJ: {type: Boolean, default: false}, 
    submitted: {type: Boolean, default: false}, 
    submission: String,
  	userGlobalId: { type: ObjectId, ref: 'User' }
  }],
  previousRound : [{ type: ObjectId, ref: 'PrevRound'}]
});

module.exports = mongoose.model('Games', GameSchema);