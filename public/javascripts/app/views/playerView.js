ht.Views.PlayerView = Backbone.View.extend({

  template: ht.Templates.PlayerTemplate,

  initialize: function() {
    this.render();
  },

  // hashtag select, image selct, waiting for everyone else, game end.

  render: function() {
    // debugger;
    this.$el.append(this.template(this.model.attributes, this.options.user.attributes));
    console.log(this.options.user);
  }

});