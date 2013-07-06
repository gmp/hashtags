ht.Views.PlayerWaitingView = Backbone.View.extend({

  className: 'waiting',

  template: ht.Templates.PlayerWaitingTemplate,


  initialize: function() {
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.render();
  },

  dispatcher_events: {
    'playerSubmit': 'playerSubmit'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({players: this.model.get('players'), username: this.attributes.username, userGlobalId: this.attributes.userGlobalId}));
  },

  playerSubmit: function() {
    var self = this;
    this.model.fetch({
      success: function(){
        self.render();
      },
      error: function(){
        console.error("error");
      }
    });
  }

});