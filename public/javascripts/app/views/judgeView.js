ht.Views.JudgeView = Backbone.View.extend({

  className: 'judge',

  template: ht.Templates.JudgeTemplate,

  initialize: function() {
    this.render();
    _.bindAll(this, 'playerSubmit');
    ht.dispatcher.on('playerSubmit', this.playerSubmit);
  },

  events: {
    'click img': 'judgeChoose',
    'click video': 'judgeChoose'
  },

  render: function() {
    this.$el.empty();
    console.log("players: ", this.model.get('players'));
    this.$el.append(this.template({players: this.model.get('players')}));
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
  },

  judgeChoose: function() {
    console.log("judge chooses: ");
  }

});