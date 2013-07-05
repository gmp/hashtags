var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  title  : String,
  prompt : String,
  judgingOrder : Array,
  round  : Number,
  gameEnd : {type:Boolean, default: false},
  judge  : {username: String, avatarURL: String, userGlobalId: String},
  numberOfSub : Number,
  players : Object,
  previousRound : Object
});

module.exports = mongoose.model('Games', GameSchema);


// this is what player looks like
// userID: {
//         hand: [String],
//         score: Number,
//         username: String,
//         avatarURL: String,
//         isJ: {type: Boolean, default: false},
//         submitted: {type: Boolean, default: false},
//         submission: {url: String, type: String, hashtag: String},
//         userGlobalId: { type: ObjectId, ref: 'User' },
//         continued: {type: Boolean, default: false}
//       }