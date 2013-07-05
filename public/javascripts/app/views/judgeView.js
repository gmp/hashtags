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
        prevRound.winningSub = e.target.src;
        prevRound.winner = $(e.target).data('submittedby');
        var selfie = this;
        prevRound.players = [];
        _.each(players, function(player){
          if(!player.isJ){
            prevRound.players.push({username: player.username, submission: player.submission});
          }
        });
        prevRound.prompt = this.model.get('prompt');
        this.model.set('previousRound', prevRound);
        var selfie = this;
        this.model.save( prevRound, {
          patch: true,
          success: function(obj){
            selfie.model.fetch({
              success: function (obj, res){
                selfie.remove();
                ht.dispatcher.trigger('judgeSelect');
              },
              error: function (){
                console.log('dude where\'s my subview?');
              }
            });
          },
          error: function(){
            console.error('bummer dude. save failed.');
          }
        });
      }
    }
  }

});