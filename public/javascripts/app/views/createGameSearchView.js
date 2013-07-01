ht.Views.CreateGameSearchView = Backbone.View.extend({

  className: 'search',

  template: ht.Templates.CreateGameSearchTemplate,

  initialize: function() {
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
    var playerName = $('#playerSearch').val();
    $.ajax({
      url: '/users/search/'+playerName,
      type: 'GET',
      success: function(data){
        ht.dispatcher.trigger('addInvited', data, self.attributes.player);
      },
      error: function(){
        console.log('error');
      }
    });
  }

});