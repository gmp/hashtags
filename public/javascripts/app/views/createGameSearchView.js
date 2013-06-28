ht.Views.CreateGameSearchView = Backbone.View.extend({

  className: 'search',

  template: ht.Templates.CreateGameSearchTemplate,

  initialize: function(options) {
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
    console.log('search');
    $.ajax({
      url: '/users/search/'+$('#playerSearch').val(),
      type: 'GET',
      success: function(){
        self.dispatcher.tigger('addInvited');
      },
      error: function(){
        console.log('error');
      }
    })
  }

});