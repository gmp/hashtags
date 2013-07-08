ht.Views.PlayerHashtagSelectView = Backbone.View.extend({

  template: ht.Templates.PlayerHashtagSelectTemplate,

  initialize: function(){
    this.render();
  },

  events: {
    'click .hashtag': 'hashtagClick'
  },

  render: function() {
    ht.Helpers.scrollTop();
    this.$el.append(this.template({hand: this.attributes.hand}));
  },

  hashtagClick: function(e) {
    this.remove();
    console.log('player hashtag select view was clicked!');
    ht.dispatcher.trigger('hashtagClick', $(e.target).data('hashtag'));
  }

});