ht.Views.GameEndView = Backbone.View.extend({

  className: 'gameEnd',

  template: ht.Templates.GameEndTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click #continue': 'goToNextRound',
    'click video': 'playVideo'
  },

  render: function() {
    ht.Helpers.scrollTop();
    this.$el.empty();
    this.$el.append(this.template({
      playersWithScore: this.model.get('players'),
      players: this.model.get('previousRound').players,
      myPlayer: this.attributes.myPlayer,
      winner: this.model.get('previousRound').winner,
      prompt: this.model.get('previousRound').prompt}));
  },

  goToNextRound: function() {
    var self = this;
    var players = this.model.get('players');
    var player = players[this.attributes.myPlayer.userGlobalId];
    player.continued = true;
    this.model.set('players', players);
    this.model.save(player, {
      patch: true,
      success: function (){
        self.model.unsetChanges();
        ht.dispatcher.trigger('continued');
      }
    });
  },

  playVideo: function(e) {
    e.target.play();
  }

});