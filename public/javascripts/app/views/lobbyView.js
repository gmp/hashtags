ht.Views.LobbyView = Backbone.View.extend({

  className: 'lobby',

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.model.on('change:pendingGames', this.render, this);
    this.model.on('change:invites', this.render, this);
    this.leaveRooms();
    this.render();
  },

  events: {
    'click #new-game-button': 'modalShow',
    'click #cancel, #mask': 'modalHide',
    'click #start-new-game': 'createGame'
  },

  dispatcher_events: {
    'changeInUser': 'changeInUser'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));

    if (this.model.get('invites').length) {
      this.invites = new ht.Views.LobbyInvitesView({model: this.model});
      this.$el.append(this.invites.el);
    }
    if (this.model.get('pendingGames').length) {
      this.pendingGames = new ht.Views.LobbyPendingGamesView({model: this.model});
      this.$el.append(this.pendingGames.el);
    }
    if (this.model.get('games').length) {
      this.games = new ht.Views.LobbyGamesListView({model: this.model});
      this.$el.append(this.games.el);
    }
  },

  leaveRooms: function(){
    ht.dispatcher.trigger('leaveRooms');
  },

  modalShow: function(event) {
    $('#new-game-modal').fadeIn(300);
    this.$el.append('<div id="mask" class="mask"></div>');
    $('#mask').fadeIn(300);
  },

  modalHide: function() {
    $('#mask, #new-game-modal, #invite-game-modal').fadeOut(300, function() {
      $('#mask').remove();
    });
  },

  changeInUser: function (){
    var self = this;
    this.model.fetch({
      success: function(user) {

        self.render();
      },
      error: function(user, res) {
        console.log('error: ', res);
      }
    });
  },

  createGame: function() {
    this.modalHide();
    ht.router.navigate('/lobby/'+this.model.id+'/new', {trigger: true});
  }

});