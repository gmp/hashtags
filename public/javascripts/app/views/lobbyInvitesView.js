ht.Views.LobbyInvitesView = Backbone.View.extend({

  className: 'invites row',

  template: ht.Templates.LobbyInvitesTemplate,

  events: {
    'click .accept': 'inviteResponse',
    'click .decline': 'declineResponse',
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({invites: this.model.get('invites')}));
    this.model.on('change:invites', this.render, this);
  },

  inviteResponse: function(e) {
    var inviteId = $(e.target).data('invite-id');
    var data = {inviteId: inviteId, userId: this.model.id};
    var self = this;
    $.ajax({
      url: '/invites/accept',
      type: 'POST',
      data: data,
      success: function(data) {
        console.log('post success');
        self.model.fetch();
      },
      error: function() {
        console.log('error');
      }
    });
  },

  declineResponse: function(e) {
    var inviteId = $(e.target).data('invite-id');
    var data = {inviteId: inviteId, userId: this.model.id};
    var self = this;
    $.ajax({
      url: '/invites/decline/',
      type: 'POST',
      data: data,
      success: function(data) {
        console.log('post success');
        self.model.fetch();
      },
      error: function() {
        console.log('error');
      }
    });
  }
});
