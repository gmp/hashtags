var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  title  : String,
  prompt : String,
  round  : Number,
  players : [{
  	state: {
	  	ammo: Number,
	  	room: String,
	  	isCow: Boolean,
  	},
  	user: { type: ObjectId, ref: 'Player' }
  }],
  previousRound : [{ type: ObjectId, ref: 'PrevRound'}]
});

module.exports = mongoose.model('Games', GameSchema);