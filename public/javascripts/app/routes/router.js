ht.Routes.Router = Backbone.Router.extend({

  routes: {
    '': 'checkState',
    'login': 'login',
    'error': 'error',
    'lobby/:id': 'lobby',
    'lobby/:id/new': 'createGame',
    'game/:gameId': 'game'
  },

  initialize: function() {
  },

  checkState: function() {
    // insert logic around checking if user is logged in from last time (cookies??)
    // if loggedIn navigate to lobby, else navigate to login
    this.navigate('/login', {trigger: true});
  },

  back: function() {
    // add support for native app http://stackoverflow.com/questions/14860461/selective-history-back-using-backbone-js
    window.history.back();
  },

  login: function() {
    ht.app.login();
  },

  error: function() {
    ht.app.error();
  },

  lobby: function(id) {
    ht.app.lobby(id);
  },

  createGame: function() {
    ht.app.createGame();
  },

  game: function(gameId) {
    ht.app.game(gameId);
  }

});
