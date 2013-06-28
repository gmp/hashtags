var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PrevRound = new Schema({
  prompt: String,
  players : [{ type: ObjectId, ref: 'Player' }],
  winner : String,
  winningSub : String
});

module.exports = mongoose.model('PrevRounds', PrevRound);