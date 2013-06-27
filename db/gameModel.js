var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
   title  : String,
   players : []
})

module.exports = mongoose.model('GameModel', GameSchema);
