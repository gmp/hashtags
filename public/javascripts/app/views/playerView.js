ht.Views.PlayerView = Backbone.View.extend({

  template: ht.Templates.PlayerTemplate,

  initialize: function() {
    this.gameHashtagSelectView = new ht.Views.GameHashtagSelectView({ model: this.model, user: this.options.user });
    this.render();
  },

  // hashtag select, image selct, waiting for everyone else, game end.

  render: function() {
    this.$el.append(this.template(this.model.attributes, this.options.user));
    this.gameHashtagSelectView.setElement(this.$el.find('#stuff-and-things'));
    this.gameHashtagSelectView.render();
   
  }

});