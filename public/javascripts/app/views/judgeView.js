ht.Views.JudgeView = Backbone.View.extend({

  className: 'judge',

  template: ht.Templates.JudgeTemplate,

  initialize: function() {
    _.bindAll(this, 'playerSubmit');
    ht.dispatcher.on('playerSubmit', this.playerSubmit);
    this.render();
  },

  events: {
    'click img': 'judgeChoose',
    'click video': 'judgeChoose'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({players: this.model.get('players'), myPlayer: this.attributes.myPlayer}));
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
  },

  judgeChoose: function(e) {
    var counter = 0;
    var players = this.model.get('players');
    _.each(players, function (player) {
      if(player.submitted){
        counter++;
      }
    });

    var remainingSubs = Object.keys(players).length - 1 - counter;
    if(counter === Object.keys(players).length - 1){
      if(confirm("Are you sure about your choice?")){
       console.log(e);
      }
    } else if(remainingSubs === 1){
      alert('awaiting 1 submission');
    } else {
      alert('awaiting '+remainingSubs+' submissions');
    }
  }

});