ht.Views.GameView = Backbone.View.extend({

  className: 'game',

  initialize: function() {
    this.joinGame();
    this.myPlayer = ht.Helpers.getMyPlayer(this.model, this.options.user.id);
    this.render();
    _.bindAll(this, 'mediaSelect');
    ht.dispatcher.on('mediaSelect', this.mediaSelect);
  },

  joinGame: function(){
    debugger;
    ht.dispatcher.trigger('joinGame', this.model.attributes.id);
  },

  events: {
    'click button' : 'handleClick'
  },

  handleClick: function(){
  },

  render: function() {
    this.$el.empty();
    this.$el.append(new ht.Views.GameHeaderView({ model: this.model }).el);
    if(this.myPlayer.isJudge){
      this.$el.append(new ht.Views.JudgeView({ model: this.model, myPlayer: this.myPlayer }).el);
    } else {
      this.$el.append(new ht.Views.PlayerView({ model: this.model, user: this.options.user, myPlayer: this.myPlayer }).el);
    }
  },

  mediaSelect: function(submissionUrl, hashtag) {
    console.log(submissionUrl, hashtag);
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