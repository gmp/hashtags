ht.Views.GameHashtagSelectView = Backbone.View.extend({

  template: ht.Templates.GameHashtagSelectTemplate,

  initialize: function(){

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

  render: function() {
    this.$el.append(this.template(this.getHand()));
    console.log(this.getHand());
  }

});