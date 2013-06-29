// Hashtags namespace
var ht = {
  Routes: {},
  Templates: {},
  Views: {},
  Models: {},
  Collections: {},
  Data: {},
  init: function() {
    ht.dispatcher = _.extend({}, Backbone.Events);
    ht.router = new ht.Routes.Router();
    Backbone.history.start();
  }
};