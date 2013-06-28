ht.Views.AppView = Backbone.View.extend({

  id: '#hashtags',

  initialize: function() {

  },

  render: function() {
    $('body').append(this.$el);
  },

  login: function() {
    console.log('app login');
    this.$el.empty();
    this.$el.append(new ht.Views.LoginView().el);
  }

});