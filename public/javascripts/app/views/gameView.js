ht.Views.GameView = Backbone.View.extend({

  className: 'game',

  initialize: function() {
    console.log('gameview:', this);
    this.render();
    _.bindAll(this, 'mediaSelect');
    ht.dispatcher.on('mediaSelect', this.mediaSelect);
  },

  events: {
    'click button' : 'handleClick'
  },

  handleClick: function(){
  },

  render: function() {
    this.$el.empty();
    this.$el.append(new ht.Views.GameHeaderView({ model: this.model }).el);
    if(this.model.attributes.judge === this.options.user.attributes.id){
      this.$el.append(new ht.Views.JudgeView({ model: this.model, user: this.options.user }).el);
    } else {
      this.$el.append(new ht.Views.PlayerView({ model: this.model, user: this.options.user }).el);
    }
  },

  mediaSelect: function(submissionUrl, hashtag) {
    var players = this.model.get('players');
    for (var i = 0; i < players.length; i++) {
      if (players[i].username === this.options.user.attributes.username) {
        players[i].submitted = true;
        players[i].submission = {url: submissionUrl, hashtag: hashtag};
      }
    }
    this.model.set('players', players);
    this.model.save();
  }

});