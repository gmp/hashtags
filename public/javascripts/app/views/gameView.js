ht.Views.GameView = Backbone.View.extend({

  template: ht.Templates.GameTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click button' : 'handleClick'
  },

  handleClick: function(){
  },

  render: function() {
    console.log(this.model);
    debugger;
    this.$el.empty();
    this.$el.append(this.template());
  }

  

});