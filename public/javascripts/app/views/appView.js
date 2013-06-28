ht.Views.AppView = Backbone.View.extend({

  id: '#hashtags',

  initialize: function() {

  },

  render: function() {
    $('body').append(this.$el);
  },

  login: function() {
    this.$el.empty();
    this.$el.append(new ht.Views.LoginView().el);
  },

  error: function() {
    this.$el.empty();
    this.$el.append(new ht.Views.ErrorView().el);
  },

  lobby: function(id) {
    var self = this;
    this.user = this.user || new ht.Models.UserModel({id: id});
    this.user.fetch({
      success: function(user) {
        self.$el.empty();
        self.$el.append(
          new ht.Views.LobbyView({
            model: user
          }).el
        );
      },
      error: function(user, res) {
        console.log('error: ', res);
      }
    });
  },

  createGame: function() {
    this.$el.empty();
    this.$el.append(
      new ht.Views.CreateGameView({
        model: this.user
      }).el
    );
  },

  game: function(gameId) {
    var self = this;
    var game = new ht.Models.GameModel({
      id: gameId
    });
    game.fetch({
      success: function(game, res){
        self.$el.empty();
        self.$el.append(
          new ht.Views.GameView({
            model: game,
            user: self.user
          }).el
        );
      },
      error: function(game, res){
        console.log("error: ", res);
      }
    });
  }

});