ht.Views.ErrorView = Backbone.View.extend({

  className: 'error',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('<p>There was a login error</p><p>Please try again:<br><a href="/auth/instagram" class="instagram-login"></a></p>');
  }

});