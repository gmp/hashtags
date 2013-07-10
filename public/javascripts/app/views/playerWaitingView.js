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

  events: {
    'click video': 'playVideo'
  },

  render: function() {
    ht.Helpers.scrollTop();
    this.$el.empty();
    this.$el.append(this.template({players: this.model.get('players'), myPlayer: this.attributes.myPlayer}));
  },

  playerSubmit: function() {
    var self = this;
    this.model.fetch({
      success: function(){
        self.render();
      },
      error: function() {
        console.error("error");
      }
    });
  },

  playVideo: function(e) {
    e.target.play();
  }

});
