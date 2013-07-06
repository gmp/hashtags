ht.Views.AppView = Backbone.View.extend({

  id: '#hashtags',

  initialize: function() {
    this.createSockets();
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.render();
  },

  render: function() {
    return this;
  },

  dispatcher_events: {
    'joinGame': 'joinGame',
    'leaveRooms': 'leaveRooms'
  },

  socket_events: {
    "changeInUser" : "changeInUser",
    "joinedRoom" : "joinedRoom",
    "otherPlayerSubmit" : "otherPlayerSubmit",
    "judgeSelect" : "judgeSelect"
  },

  createSockets: function() {
    this.socket = io.connect();
    if (this.socket_events && _.size(this.socket_events) > 0) {
      ht.Helpers.delegateCustomEvents(this.socket, this.socket_events, this);
    }
  },

  leaveRooms: function(){
    if(this.roomId){
      this.socket.emit('leaveGame', this.roomId);
      delete this.roomId;
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
    this.socket.emit('gotUserId', {user: id});
    this.currentGame && this.currentGame.remove();
    this.user = this.user || new ht.Models.UserModel({
      id: id
    });
    this.user.fetch({
      success: function(user) {
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

  otherPlayerSubmit: function() {
    ht.dispatcher.trigger('playerSubmit');
  },

  judgeSelect: function() {
    ht.dispatcher.trigger('judgeSelect');
  }

});