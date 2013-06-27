ht.Routes.Router = Backbone.Router.extend({

  routes: {
    '': 'login',
    'error': 'error',
    'lobby/:id': 'lobby',
    'lobby/:userId/new': 'newGame',
    'game/:gameId': 'game'
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
    var user = new ht.Models.UserModel({id: id});
    user.fetch({
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

  newGame: function(userId) {
    // client syncs/downloads users collection to allow for searching
    // start create game
    new ht.Views.CreateGameView({model: user});
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
