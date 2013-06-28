ht.Routes.Router = Backbone.Router.extend({

  routes: {
    '': 'checkState',
    'login': 'login',
    'error': 'error',
    'lobby/:id': 'lobby',
    'lobby/:id/new': 'newGame',
    'game/:gameId': 'game'
  },

  initialize: function() {
    this.app = new ht.Views.AppView();
    this.app.render();
  },

  checkState: function() {
    // insert logic around checking if user is logged in from last time (cookies??)
    // if loggedIn navigate to lobby, else navigate to login
    this.navigate('/login', {trigger: true});
  },

  // back: function() {
  //   // add support for native app http://stackoverflow.com/questions/14860461/selective-history-back-using-backbone-js
  //   window.history.back();
  // },

  login: function() {
    console.log('router login');
    this.app.login();
  }

  // error: function() {
  //   // if login fails, create error view with option to try login again
  //   new ht.Views.ErrorView({
  //     el: '#hashtags'
  //   });
  // },

  // lobby: function(id) {
  //   console.log(this);
  //   this.user = new ht.Models.UserModel({id: id});
  //   this.user.fetch({
  //     success: function(user, res) {
  //       new ht.Views.LobbyView({
  //         el: '#hashtags',
  //         model: user
  //       });
  //     },
  //     error: function(user, res) {
  //       console.log('error: ', res);
  //     }
  //   });
  // },

  // newGame: function() {
  //   console.log('new game in router');
  //   new ht.Views.CreateGameView({
  //     model: this.user
  //   });
  // },

  // game: function(gameId) {
  //   var game = new ht.Models.GameModel({
  //     id: gameId
  //   });
  //   game.fetch({
  //     success: function(game, res){
  //       new ht.Views.GameView({
  //         el: '#hashtags',
  //         model: game
  //       });
  //     },

  //     error: function(game, res){
  //       console.log("error: ", res);
  //     }
  //   });
  // }

});
