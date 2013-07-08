ht.Views.LobbyPendingGamesView = Backbone.View.extend({

  className: 'pending-games-list',

  template: ht.Templates.LobbyPendingGamesTemplate,

  initialize: function() {
    this.model.on('change:pendingGames', this.render);
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template( { pendingGames: this.model.get('pendingGames') } ) );
  }

});
