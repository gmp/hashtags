ht.Views.GameHashtagSelectView = Backbone.View.extend({

  template: ht.Templates.GameHashtagSelectTemplate,

  initialize: function(){
    this.render();
  },

  events: {
    'click .hashtag': 'hashtagClick'
  },

  render: function() {
    this.$el.append(this.template({hand: this.options.hand}));
  },

  hashtagClick: function(e) {
    this.remove();
    ht.dispatcher.trigger('hashtagClick', $(e.target).data('hashtag'));
  }

});