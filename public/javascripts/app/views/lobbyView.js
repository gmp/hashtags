ht.Views.LobbyView = Backbone.View.extend({

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
    this.render();
  },

  render: function() {
    console.log(this.model);
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  }
});