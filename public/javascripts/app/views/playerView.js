ht.Views.PlayerView = Backbone.View.extend({

  className: 'player',

  initialize: function() {
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.subView = undefined;
    this.hashtagSelected = false;
    this.render();
  },

  dispatcher_events: {
    'hashtagClick': 'hashtagClick'
  },

  render: function() {
    this.attributes.myPlayer = ht.Helpers.getMyPlayer(this.model, this.attributes.user.id);
    // if player has not submitted image and not selected hashtag
    if (!this.attributes.myPlayer.submitted && !this.hashtagSelected) {
      if (this.subView) this.subView.remove();
      this.$el.empty();
      this.subView = new ht.Views.PlayerHashtagSelectView({
        model: this.model,
        attributes: {
          hand: this.attributes.myPlayer.hand
        }
      });
      this.$el.append(this.subView.el);

    // if player has not submitted image, but selected hashtag
    } else if (!this.attributes.myPlayer.submitted && this.hashtagSelected) {
      if (this.subView) this.subView.remove();
      this.$el.empty();
      this.subView = new ht.Views.PlayerImageSelectView({
        model: this.model,
        attributes: {
          myPlayer: this.attributes.myPlayer,
          accessToken: this.attributes.user.get('accessToken'),
          hashtag: this.hashtagSelected
        }
      });
      this.$el.append(this.subView.el);

    // if player has submitted, but game has not ended
    } else if (this.attributes.myPlayer.submitted) {
      if (this.subView) this.subView.remove();
      this.$el.empty();
      this.subView = new ht.Views.PlayerWaitingView({
        model: this.model,
        attributes: {
          myPlayer: this.attributes.myPlayer
        }
      });
      this.$el.append(this.subView.el);
    }
  },

  hashtagClick: function(hashtag) {
    this.hashtagSelected = hashtag;
    this.render();
    console.log("hashtagClick");
  }
});
