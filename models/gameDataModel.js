var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameDataSchema = new Schema({
  gameId   : String,
  hashtags : Array,
  prompts  : Array
});

module.exports = mongoose.model('GameData', GameDataSchema);