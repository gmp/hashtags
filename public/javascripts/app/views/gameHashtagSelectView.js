ht.Views.GameHashtagSelectView = Backbone.View.extend({

  template: ht.Templates.GameHashtagSelectTemplate,

  initialize: function(){
    this.hand = this.getHand();
    this.render();
  },

  events: {
    'click .hashtag': 'hashtagClick'
  },

  render: function() {
    this.$el.append(this.template({hand: this.hand}));
  },

  getHand: function(){
    var players = this.model.attributes.players;
    var userId = this.options.user.id;
    for(var i = 0; i <  players.length; i++){
      if(userId === players[i].userGlobalId){
        return players[i].hand;
      }
    }
  },

  hashtagClick: function(e) {
    ht.dispatcher.trigger('hashtagClick', $(e.target).data('hashtag'));
  }

});