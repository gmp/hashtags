ht.Views.LobbyView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('In the lobby with User'+this.options.userId+'<br><a href="">Login</a>');
  }
});