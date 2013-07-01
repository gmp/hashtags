ht.Views.LoginView = Backbone.View.extend({

  className: 'login',

  template: ht.Templates.LoginTemplate,

  initialize: function() {
    this.render();
  },

  

  render: function() {
    this.$el.empty();
    this.$el.append(this.template());
  }

});