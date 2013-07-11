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
    this.dispatcher = _.extend({}, Backbone.Events);
    this.app = new this.Views.AppView();
    this.router = new this.Routes.Router();
    Backbone.history.start();
    $('body').append(this.app.$el);
  }
};

ht.Helpers.getMyPlayer = function(gameModel, userId) {
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

// Destroys event listeners which would otherwise not be destoryed 
//since thet are not directly attached to a backbone view
Backbone.View.prototype.doubleTap = function(eventToRemove){
  ht.dispatcher.off(eventToRemove);
  this.remove.apply(this, arguments);
};
