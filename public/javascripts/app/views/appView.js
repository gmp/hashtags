ht.Views.AppView = Backbone.View.extend({

  id: '#hashtags',

  socket_events: {
    "message": "got_message",
  },


  initialize: function() {
    this.socket = io.connect();
    _.bindAll(this, 'joinGame');
    ht.dispatcher.on('joinGame', this.joinGame);
    if (this.socket_events && _.size(this.socket_events) > 0) {
      this.delegateSocketEvents(this.socket_events);
    }
  },


  delegateSocketEvents: function(events) {
    for (var key in events) {
      var method = events[key];
      if (!_.isFunction(method)) {
        method = this[events[key]];
      }

      if (!method) {
        throw new Error('Method "' + events[key] + '" does not exist');
      }

      method = _.bind(method, this);
      this.socket.on(key, method);
    };
  },

  got_message: function(data){
    console.log(data);
    this.socket.emit('event', {gello: 'red'});
  },

  joinGame: function(gameId){
    this.socket.emit('joinGame', gameId);
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
    this.user = this.user || new ht.Models.UserModel({
      id: id
    });
    this.user.fetch({
      success: function(user) {
        console.log(self.user);
        self.$el.empty();
        self.$el.append(
          new ht.Views.LobbyView({
          model: user
        }).el);
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
      model: this.user,
      dispatcher: ht.dispatcher
    }).el);
  },



  game: function(gameId) {
    var self = this;
    var game = new ht.Models.GameModel({
      id: gameId
    });
    game.fetch({
      success: function(game, res) {
        self.$el.empty();
        ht.dispatcher.trigger('')
        self.$el.append(
          new ht.Views.GameView({
          model: game,
          user: self.user
        }).el);
      },
      error: function(game, res) {
        console.log("error: ", res);
      }
    });
  }

});