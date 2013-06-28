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

  lobby: function(id) {
    var self = this;
    this.user = new ht.Models.UserModel({id: id});
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
  }

});