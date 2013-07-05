ht.Views.GameEndView = Backbone.View.extend({

  // className: 'gameEnd',

  template: ht.Templates.GameEndTemplate,

  initialize: function() {
    this.render();
  },

  render: function() {
    // this.$el.empty();
    // debugger;
    this.$el.append(this.template({players: this.model.players, myPlayer: this.attributes.myPlayer}).el);
  }

});