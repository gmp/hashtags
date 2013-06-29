ht.Views.LoginView = Backbone.View.extend({

  className: 'login',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('<a href="/auth/instagram" class="instagram-login"></a>');
  }

});