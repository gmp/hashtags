var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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

module.exports = mongoose.model('Players', Player);
