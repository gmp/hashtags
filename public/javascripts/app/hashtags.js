// Hashtags namespace
var ht = {
  Routes: {},
  Templates: {},
  Views: {},
  Models: {},
  Collections: {},
  Data: {},
  init: function() {
    app = new ht.Routes.Router();
    Backbone.history.start();
  }
};