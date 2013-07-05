ht.Views.GameEndView = Backbone.View.extend({

  className: 'gameEnd',

  template: ht.Templates.GameEndTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click #continue': 'goToNextRound'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({
      players: this.model.get('previousRound').players,
      myPlayer: this.attributes.myPlayer,
      winner: this.model.get('previousRound').winner,
      prompt: this.model.get('previousRound').prompt}));
  },

  goToNextRound: function() {
    this.attributes.myPlayer.continued = true;
    this.model.save( )
  }

});