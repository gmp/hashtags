ht.Views.AppView = Backbone.View.extend({

  id: '#hashtags',

  socket_events: {
    "changeInUser" : "changeInUser",
    "joinedRoom" : "joinedRoom",
    "otherPlayerSubmit" : "otherPlayerSubmit",
    // "judgeSelect" : "judgeSelect"
  },

  initialize: function() {
    this.createSockets();
    _.bindAll(this, 'joinGame','leaveRooms');
    ht.dispatcher.on('joinGame', this.joinGame);
    ht.dispatcher.on('leaveRooms', this.leaveRooms);
  },

  leaveRooms: function(){
    if(this.roomId){
      this.socket.emit('leaveGame', this.roomId);
      delete this.roomId;
    }
  },

  createSockets: function() {
    this.socket = io.connect();
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
    }
  },

  changeInUser: function(){
    ht.dispatcher.trigger('changeInUser');
  },

  joinGame: function(gameId){
    this.socket.emit('joinGame', gameId);
  },

  joinedRoom: function(gameId){
    this.roomId = gameId;
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
    this.currentGame && this.currentGame.remove();
    this.user = this.user || new ht.Models.UserModel({
      id: id
    });
    this.user.fetch({
      success: function(user) {
        self.socket.emit('gotUserId', {user: user.get('id')});
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
      model: this.user
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
        self.currentGame = new ht.Views.GameView({
            model: game,
            attributes: {
              user: self.user
            }
        });
        self.$el.append(self.currentGame.el);
      },
      error: function(game, res) {
        console.log("error: ", res);
      }
    });
  },

  otherPlayerSubmit: function(gameId) {
    console.log('heard the submission');
    ht.dispatcher.trigger('playerSubmit');
  }

});