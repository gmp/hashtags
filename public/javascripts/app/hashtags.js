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

ht.Helpers.scrollTop = function() {
  window.scrollTo(0,1);
};

Backbone.Model.prototype.unsetChanges = function() {
  _(this.changed).each(function(val, attr) {
    this.unset(attr, {silent: true});
  }, this);
};





