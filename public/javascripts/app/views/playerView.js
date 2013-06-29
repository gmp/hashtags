ht.Views.PlayerView = Backbone.View.extend({

  className: 'player',

  initialize: function() {
    this.hashtagSelected = false;
    _.bindAll(this, 'hashtagClick');
    ht.dispatcher.on('hashtagClick', this.hashtagClick);
    this.render();
  },

  render: function() {
    // if player has not submitted image and not selected hashtag
    if (!this.options.myPlayer.submitted && !this.hashtagSelected) {
      this.$el.empty();
      this.$el.append(new ht.Views.GameHashtagSelectView({
        model: this.model,
        hand: this.options.myPlayer.hand
      }).el);

    // if player has not submitted image, but selected hashtag
    } else if (!this.options.myPlayer.submitted && this.hashtagSelected) {
      this.$el.empty();
      this.$el.append(new ht.Views.PlayerImageSelectView({
        model: this.model,
        accessToken: this.options.user.attributes.accessToken,
        hashtag: this.hashtagSelected
      }).el);

    // if player has submitted, but game has not ended
    } else if (this.options.myPlayer.submitted) {
      this.$el.empty();
      this.$el.append(new ht.Views.GameWaitingView({}));
    }
  },

  hashtagClick: function(hashtag) {
    this.hashtagSelected = hashtag;
    this.render();
  }
});