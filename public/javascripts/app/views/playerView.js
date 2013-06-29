ht.Views.PlayerView = Backbone.View.extend({

  className: 'player',

  initialize: function() {
    this.hashtagSelected = false;
    _.bindAll(this, 'hashtagClick');
    ht.dispatcher.on('hashtagClick', this.hashtagClick);
    this.render();
  },

  // hashtag select, image select, waiting for everyone else, game end.

  render: function() {
    if (!this.options.myPlayer.submitted && !this.hashtagSelected) {
      this.$el.empty();
      this.$el.append(new ht.Views.GameHashtagSelectView({ model: this.model, user: this.options.user }).el);
    } else if (!this.options.myPlayer.submitted && this.hashtagSelected) {
      this.$el.empty();
      this.$el.append(new ht.Views.PlayerImageSelectView({ model: this.model, user: this.options.user, hashtag: this.hashtagSelected }).el);
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