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
  debugger;
  return gameModel.get('players')[userId];
};

ht.Helpers.delegateCustomEvents = function(obj, events, context) {
  for (var key in events) {
    var method = events[key];
    if (!_.isFunction(method)) {
      method = context[events[key]];
    }
    if (!method) {
      throw new Error('Method "' + events[key] + '" does not exist');
    }
    method = _.bind(method, context);
    obj.on(key, method);
  }
};





