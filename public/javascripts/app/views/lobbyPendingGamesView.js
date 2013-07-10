ht.Views.LobbyPendingGamesView = Backbone.View.extend({

  className: 'pending-games-list',

  template: ht.Templates.LobbyPendingGamesTemplate,

  initialize: function() {
    this.render();
  },

   events: {
    'click .declined': 'removeGame',
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template( { pendingGames: this.model.get('pendingGames') } ) );
  },

  removeGame: function(event) {
    var self = this;
    //remove pending game from db
    var data = {userId: this.model.attributes.id, pendingGameId: event.target.id };
    $.ajax({
      url: '/invites/removeDeclinedGame',
      type: 'POST',
      data: data,
      success: function(data){
        self.model.fetch();
      },
      error: function(){
        console.log('error');
      }
    });
  }

});
