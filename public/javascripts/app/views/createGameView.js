ht.Views.CreateGameView = Backbone.View.extend({

  template: ht.Templates.CreateGameTemplate,

  initialize: function() {
    this.render();
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.template());
  }

});