var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PrevRound = new Schema({
  prompt: String,
  players : [{ username: String, submission: Object}],
  winner : String,
  winningSub : String
});

module.exports = mongoose.model('PrevRounds', PrevRound);