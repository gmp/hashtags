// Hashtags namespace
var ht = {
  Routes: {},
  Templates: {},
  Views: {},
  Models: {},
  Collections: {},
  Data: {},
  Helpers: {},
  init: function() {
    ht.dispatcher = _.extend({}, Backbone.Events);
    ht.router = new ht.Routes.Router();
    Backbone.history.start();
  }
};

ht.Helpers.getMyPlayer = function(gameModel, userId){
  var players = gameModel.attributes.players;
  return players[userId];
};





