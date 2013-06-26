ht.Routes.Router = Backbone.Router.extend({

  routes: {
    "/": "login",
    "lobby/:userId": "lobby",
    "game/:gameId": "game"
  },

  login: function() {
    new ht.Views.Login();
  },

  lobby: function(userId) {
    // find user in db and create model
    new ht.Views.Lobby({model: user});
  },

  game: function(gameId) {
    // find game in db and create model
    new ht.Views.Game({model: game});
  }

});