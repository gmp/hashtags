ht.Views.LobbyView = Backbone.View.extend({

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click button' : function(){
      app.navigate('game/' + this.model.attributes.games[0]);
    }
  },

  render: function() {
    console.log(this.model);
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  }
});