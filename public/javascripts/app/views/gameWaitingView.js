ht.Views.GameWaitingView = Backbone.View.extend({

  className: 'waiting',

  template: ht.Templates.GameWaitingTemplate,


  initialize: function() {
    this.render();
    _.bindAll(this, 'playerSubmit');
    ht.dispatcher.on('playerSubmit', this.playerSubmit)
  },

  render: function() {
    this.$el.empty();
    this.$el.append('you are waiting');
    console.log("players: ", this.model.get('players'));
    this.$el.append(this.template({players: this.model.get('players')}));
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