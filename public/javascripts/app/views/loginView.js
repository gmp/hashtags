ht.Views.LoginView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('<a href="/auth/instagram">Login with Instagram</a>');
  }

});