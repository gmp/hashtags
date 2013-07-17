ht.Views.JudgeView = Backbone.View.extend({

  className: 'judge',

  template: ht.Templates.JudgeTemplate,

  initialize: function() {
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.render();
  },

  events: {
    'click .media-select': 'judgeChoose',
    'click video': 'playVideo'
  },

  dispatcher_events: {
    'playerSubmit': 'playerSubmit'
  },

  render: function() {
    ht.Helpers.scrollTop();
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
      success: function() {
        self.render();
      },
      error: function() {
        console.error("error");
      }
    });
  },

  judgeChoose: function(e) {
    var counter = 0;
    var players = this.model.get('players');
    _.each(players, function (player) {
      if(player.submitted) {
        counter++;
      }
    });
    if(counter === Object.keys(players).length - 1) {
      var prevRound = {};
      prevRound.winningSub = $(e.target).data('submittedUrl');
      prevRound.winner = $(e.target).data('submittedby');
      var selfie = this;
      prevRound.players = [];
      _.each(players, function(player) {
        if(!player.isJ){
          prevRound.players.push({username: player.username, submission: player.submission});
        }
      });
      prevRound.prompt = this.model.get('prompt');
      this.model.set('previousRound', prevRound);
      this.attributes.myPlayer.continued = false;
      this.model.save(prevRound, {
        success: function() {
          ht.dispatcher.trigger('judgeSelect');
          selfie.doubletap(this.dispatcher_events);
        },
        error: function() {
          console.error('bummer dude. save failed.');
        }
      });
    }
  },

  playVideo: function(e) {
    e.target.play();
  }

});
