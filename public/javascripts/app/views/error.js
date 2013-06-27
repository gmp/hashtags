ht.Views.Error = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('<a href="">Login</a><br>Error');
  }

});