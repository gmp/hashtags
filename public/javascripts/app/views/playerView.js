ht.Views.PlayerView = Backbone.View.extend({

  className: 'player',

  initialize: function() {
    this.hashtagSelected = false;
    _.bindAll(this, 'hashtagClick');
    ht.dispatcher.bind('hashtagClick', this.hashtagClick);
    this.render();
  },

  // hashtag select, image select, waiting for everyone else, game end.

  render: function() {
    if (!this.hashtagSelected) {
      this.$el.empty();
      this.$el.append(new ht.Views.GameHashtagSelectView({ model: this.model, user: this.options.user }).el);
    } else if (this.hashtagSelected) {
      this.$el.empty();
      this.$el.append(new ht.Views.PlayerImageSelectView({ model: this.model, user: this.options.user, hashtag: this.hashtagSelected }).el);
    }
  },

  hashtagClick: function(hashtag) {
    this.hashtagSelected = hashtag;
    this.render();
  }

});