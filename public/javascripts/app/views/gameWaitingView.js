ht.Views.GameWaitingView = Backbone.View.extend({

  className: 'waiting',

  template: ht.Templates.GameWaitingTemplate,


  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.append('you are waiting');
    console.log("players: ", this.model.get('players'));
    this.$el.append(this.template({players: this.model.get('players')}));
  }

});