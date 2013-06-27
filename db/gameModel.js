var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Player = new Schema({
	id: String, 
	hand: [String], 
	isJ: {type: Boolean, default: false}, 
	submitted: {type: Boolean, default: false}, 
	submission: String, 
	score: Number, 
	avatar: String, 
	username: String
});

var PrevRound = new Schema({
  prompt: String,
  players: [Player],
  winner : String,
  winningSub : String
});

var GameSchema = new Schema({
   title  : String,
   prompt : String,
   round  : Number,
   players : [Player],
   previousRound : [PrevRound]
});

exports.Game = mongoose.model('Games', GameSchema);
exports.Player = mongoose.model('Players', Player);
exports.PrevRound = mongoose.model('PrevRounds', PrevRound)
