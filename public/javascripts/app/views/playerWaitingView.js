ht.Views.PlayerWaitingView = Backbone.View.extend({

  className: 'waiting',

  template: ht.Templates.PlayerWaitingTemplate,


  initialize: function() {
    this.render();
    _.bindAll(this, 'playerSubmit');
    ht.dispatcher.on('playerSubmit', this.playerSubmit);
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({players: this.model.get('players'), myPlayer: this.attributes.myPlayer}));
  },

  playerSubmit: function() {
    var self = this;
    console.log("GameWaitingView");
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