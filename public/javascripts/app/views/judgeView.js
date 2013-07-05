ht.Views.JudgeView = Backbone.View.extend({

  className: 'judge',

  template: ht.Templates.JudgeTemplate,

  initialize: function() {
    _.bindAll(this, 'playerSubmit');
    ht.dispatcher.on('playerSubmit', this.playerSubmit);
    this.render();
  },

  events: {
    'click .media-select': 'judgeChoose',
    'click video': 'playVideo'
  },

  render: function() {
    this.$el.empty();
    var counter = 0;
    var players = this.model.get('players');
    _.each(players, function (player) {
      if(player.submitted){
        counter++;
      }
    });
    var remainingSubs = Object.keys(players).length - 1 - counter;
    this.$el.append(this.template({players: this.model.get('players'), myPlayer: this.attributes.myPlayer, remainingSubs: remainingSubs}));
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
    if(counter === Object.keys(players).length - 1){
      if(confirm("Are you sure about your choice?")){
        var prevRound = {};
        prevRound.winningSub = e.target.previousSibling.previousSibling.src;
        prevRound.winner = $(e.target.previousSibling.previousSibling).data('submittedby');
        var selfie = this;
        prevRound.players = [];
        _.each(players, function(player){
          if(!player.isJ){
            prevRound.players.push({username: player.username, submission: player.submission});
          }
        });
        prevRound.prompt = this.model.get('prompt');
        this.model.set('previousRound', prevRound);
        this.attributes.myPlayer.continued = false;
        this.model.save(prevRound, {
          success: function(){
            selfie.remove();
            console.log('success');
            ht.dispatcher.trigger('judgeSelect');
          },
          error: function(){
            console.error('bummer dude. save failed.');
          }
        });
      }
    }
  },

  playVideo: function(e) {
    e.target.play();
  }

});