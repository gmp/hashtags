ht.Views.GameWaitingView = Backbone.View.extend({

  className: 'waiting',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html('you are waiting');
  }

});