ht.Views.CreateGameSearchView = Backbone.View.extend({

  className: 'search',

  template: ht.Templates.CreateGameSearchTemplate,

  initialize: function(options) {
    this.player = options.player;
    this.dispatcher = options.dispatcher;
    this.render();
  },

  events: {
    'click #search': 'search'
  },

  render: function() {
    this.$el.append(this.template());
  },

  search: function() {
    var self = this;
    $.ajax({
      url: '/users/search/'+$('#playerSearch').val(),
      type: 'GET',
      success: function(data){
        self.dispatcher.trigger('addInvited', data, self.player);
        self.remove();
      },
      error: function(){
        console.log('error');
      }
    })
  }

});