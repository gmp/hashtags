ht.Views.PlayerView = Backbone.View.extend({

  template: ht.Templates.PlayerTemplate,

  initialize: function() {
    this.render();
  },

  // hashtag select, image selct, waiting for everyone else, game end.

  render: function() {
    var hand = this.getHand();
    this.$el.append(this.template(this.model.attributes, this.options.user));
  },

  getHand: function(){
    var players = this.model.attributes.players;
    var userId = this.options.user.id;
    for(var i = 0; i <  players.length; i++){
      if(userId === players[i].userGlobalId){
        return players[i].hand;
      }
    }
  }



});