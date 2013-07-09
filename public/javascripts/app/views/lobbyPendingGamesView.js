ht.Views.LobbyPendingGamesView = Backbone.View.extend({

  className: 'pending-games-list',

  template: ht.Templates.LobbyPendingGamesTemplate,

  initialize: function() {
    this.render();
  },

   events: {
    'click .declined': 'removeMe',
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template( { pendingGames: this.model.get('pendingGames') } ) );
  },

  removeMe: function() {
    this.remove();
  }

});
