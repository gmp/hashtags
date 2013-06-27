ht.Views.Lobby = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    console.log(this);
    this.$el.empty();
    this.$el.html('In the lobby with User'+this.options.userId+'<br><a href="">Login</a>');
  }
});