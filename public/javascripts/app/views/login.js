ht.Views.Login = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('<a href="#error">Error redirect</a><br><a href="#lobby/123">User123\'s Lobby</a><br>Hello World');
  }

});