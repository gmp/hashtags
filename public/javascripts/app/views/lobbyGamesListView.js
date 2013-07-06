ht.Views.LobbyGamesListView = Backbone.View.extend({

  className: 'games-list',

  template: ht.Templates.LobbyGamesListTemplate,

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({games: this.model.get('games')}));
  }
});