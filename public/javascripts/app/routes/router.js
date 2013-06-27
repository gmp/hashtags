ht.Routes.Router = Backbone.Router.extend({

  routes: {
    '': 'login',
    'error': 'error',
    'lobby/:id': 'lobby',
    'lobby/:id/new': 'newGame',
    'game/:gameId': 'game'
  },

  initialize: function() {

  },

  login: function() {
    console.log('login');
    // create login view
    new ht.Views.LoginView({
      el: '#hashtags'
    });
  },

  error: function() {
    // if login fails, create error view with option to try login again
    new ht.Views.ErrorView({
      el: '#hashtags'
    });
  },

  lobby: function(id) {
    console.log(this);
    this.user = new ht.Models.UserModel({id: id});
    this.user.fetch({
      success: function(user, res) {
        new ht.Views.LobbyView({
          el: '#hashtags',
          model: user
        });
      },
      error: function(user, res) {
        console.log('error: ', res);
      }
    });
  },

  newGame: function() {
    console.log('new game in router');
    new ht.Views.CreateGameView({
      el: '#hashtags',
      model: this.user
    });
  },

  game: function(gameId) {
    // find game in db and create model
    var game = {};
    debugger;
    new ht.Views.GameView({
      el: '#hashtags',
      model: game
    });
  }

});
