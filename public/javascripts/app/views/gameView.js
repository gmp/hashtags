ht.Views.GameView = Backbone.View.extend({

  className: 'game',

  initialize: function() {
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
    // this.$el.append(this.template(this.model.attributes));
    this.$el.append(new ht.Views.GameHeaderView({ model: this.model }).el);
    if(this.model.attributes.judge === this.options.user.attributes.id){
      this.$el.append(new ht.Views.JudgeView({ model: this.model, user: this.options.user }).el);
    } else {
      this.$el.append(new ht.Views.PlayerView({ model: this.model, user: this.options.user }).el);
    }
  },

  mediaSelect: function(submissionUrl, hashtag) {
    console.log(this.model, submissionUrl, hashtag);
  }

});