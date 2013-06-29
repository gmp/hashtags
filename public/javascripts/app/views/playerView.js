ht.Views.PlayerView = Backbone.View.extend({

  className: 'player',

  initialize: function() {
    this.subView = undefined;
    this.hashtagSelected = false;
    _.bindAll(this, 'hashtagClick');
    ht.dispatcher.on('hashtagClick', this.hashtagClick);
    this.render();
  },

  render: function() {
    // if the current round has ended (judge selected a winner), 
    // but the current player has not 'continued'
    // render the gameEndView to see round results
    if (this.model.gameEnded) {
      if (!this.options.myPlayer.continued) {
        this.subView && this.subView.remove();
        this.$el.empty();
        this.subView = new ht.Views.GameEndView({
          model: this.model,
          player: this.options.myPlayer
        });
        this.$el.append(this.subView.el);
      }

    // else if the current round is not over
    } else {
      // if player has not submitted image and not selected hashtag
      if (!this.options.myPlayer.submitted && !this.hashtagSelected) {
        this.subView && this.subView.remove();
        this.$el.empty();
        this.subView = new ht.Views.PlayerHashtagSelectView({
          model: this.model,
          hand: this.options.myPlayer.hand
        });
        this.$el.append(this.subView.el);

      // if player has not submitted image, but selected hashtag
      } else if (!this.options.myPlayer.submitted && this.hashtagSelected) {
        this.subView && this.subView.remove();
        this.$el.empty();
        this.subView = new ht.Views.PlayerImageSelectView({
          model: this.model,
          accessToken: this.options.user.attributes.accessToken,
          hashtag: this.hashtagSelected
        });
        this.$el.append(this.subView.el);

      // if player has submitted, but game has not ended
      } else if (this.options.myPlayer.submitted) {
        this.subView && this.subView.remove();
        this.$el.empty();
        this.subView = new ht.Views.GameWaitingView({
          model: this.model,
          player: this.options.myPlayer
        });
        this.$el.append(this.subView.el);
      }
    }
  },

  hashtagClick: function(hashtag) {
    this.hashtagSelected = hashtag;
    this.render();
  }
});