ht.Views.LobbyView = Backbone.View.extend({

  className: 'lobby',

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
    _.bindAll(this, 'changeInUser');
    ht.dispatcher.on('changeInUser', this.changeInUser);
    ht.dispatcher.trigger('createSockets');
    this.leaveRooms();
    this.render();
  },

  events: {
    'click .new-game-button': 'modalShow',
    'click #cancel, #mask': 'modalHide',
    'click #start-new-game': 'createGame',
    'click #accept-game': 'inviteResponse',
    'click #invite': 'inviteModalShow',
    'click #decline-game': 'declineResponse'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  },

  leaveRooms: function(){
    console.log('i gets called');
    ht.dispatcher.trigger('leaveRooms');
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
  }
});