ht.Views.LobbyInvitesView = Backbone.View.extend({

  className: 'invites row',

  template: ht.Templates.LobbyInvitesTemplate,

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({invites: this.model.get('invites')}));
  }
});