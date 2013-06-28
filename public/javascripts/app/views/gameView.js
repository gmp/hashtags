ht.Views.GameView = Backbone.View.extend({

  className: 'game',

  template: ht.Templates.GameTemplate,

  initialize: function() {
    this.gameHeaderView = new ht.Views.GameHeaderView({ model: this.model });
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

    // tell sub-view where to render.
    this.gameHeaderView.setElement(this.$el.find('.game-header'));

    this.gameHeaderView.render();
  }

});