ht.Views.LobbyInvitesView = Backbone.View.extend({

  className: 'invites row',

  template: ht.Templates.LobbyInvitesTemplate,

  events: {
    'click .accept': 'inviteResponse',
    'click .decline': 'declineResponse'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({invites: this.model.get('invites')}));
  },

  inviteResponse: function(e) {
    var inviteId = $(e.target).data('invite-id');
    console.log('herro:', inviteId);
    $.ajax({
      url: '/invites/accept/',
      type: 'GET',
      success: function(data){
        
      },
      error: function(){
        console.log('error');
      }
    });
  },

  declineResponse: function(e) {
    var inviteId = $(e.target).data('invite-id');
    console.log('goodBye:', inviteId);
  }
});