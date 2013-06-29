ht.Views.GameView = Backbone.View.extend({

  className: 'game',

  template: ht.Templates.GameTemplate,

  initialize: function() {
    this.gameHeaderView = new ht.Views.GameHeaderView({ model: this.model });
    this.playerView = new ht.Views.PlayerView({ model: this.model, user: this.options.user });
    this.judgeView = new ht.Views.JudgeView({ model: this.model, user: this.options.user });
    this.render();
  },

  events: {
    'click button' : 'handleClick'
  },

  handleClick: function(){
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
    this.gameHeaderView.setElement(this.$el.find('.game-header'));
    this.gameHeaderView.render();
    if(this.model.attributes.judge === this.options.user.attributes.id){
      this.judgeView.setElement(this.$el.find('.play-or-judge'));
      this.judgeView.render();
    } else {
      this.playerView.setElement(this.$el.find('.play-or-judge'));
      this.playerView.render();
    }

    // tell sub-view where to render.
  }

});