ht.Views.LobbyView = Backbone.View.extend({

  className: 'lobby',

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
    console.log(this.model);
    _.bindAll(this, 'changeInUser');
    ht.dispatcher.on('changeInUser', this.changeInUser);
    ht.dispatcher.trigger('createSockets');
    this.render();
  },

  events: {
    'click .new-game-button': 'modalShow',
    'click #cancel, #mask': 'modalHide',
    'click #start-new-game': 'createGame',
    'click #accept-game': 'inviteResponse',
    'click #invite': 'inviteModalShow',
    'click #decline-game': 'declineResponse',
    'click .drop-down': 'dropDown'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
    // if (this.model.get('invites')) {
    //   this.$el.append(ht.Views.LobbyInviteView({model: this.model}));
    // }
    // if (this.model.get('pendingGames')) {
    //   this.$el.append(ht.Views.LobbyPendingGamesView({model: this.model}));
    // }
    // if (this.model.get('games')) {
    //   this.$el.append(ht.Views.LobbyGamesListView({model: this.model}));
    // }
  },

  inviteModalShow: function(event){
    $('#invite-game-modal').fadeIn(300);
    this.$el.append('<div id="mask" class="mask"></div>');
    $('#mask').fadeIn(300);
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
    console.log('made it to the lobby');
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
  },

  inviteResponse: function() {
    console.log('herro');
  },

  declineResponse: function() {
    console.log('goodBye');
  },

  dropDown: function(e) {
    console.log('drop');
    var $target = $(e.target);
    console.log($target.next(".game-info"));
    $target.next(".game-info").slideDown();
  }
});