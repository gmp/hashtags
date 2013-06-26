ht.Routes.Router = Backbone.Router.extend({

  routes: {
    "/": "login",
    "error": "error",
    "lobby/:userId": "lobby",
    "lobby/:userId/search": "newGame",
    "game/:gameId": "game"
  },

  login: function() {
    // create login view
    new ht.Views.Login();
  },

  error: function() {
    // if login fails, create error view with option to try login again
    new ht.Views.Error();
  },

  lobby: function(userId) {
    // if login is successful, user is created in DB on server
    // client finds user in DB based on ID and creates model to display lobby view
    new ht.Views.Lobby({model: user});
  },

  newGame: function(userId) {
    // client syncs/downloads users collection to allow for searching
    // start create game
    new ht.Views.CreateGame({model: user});
  },

  game: function(gameId) {
    // find game in db and create model
    new ht.Views.Game({model: game});
  }

});