ht.Views.CreateGameSearchView = Backbone.View.extend({

  className: 'search',

  template: ht.Templates.CreateGameSearchTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click #search': 'search',
    'keyup #playerSearch': 'autosearch'
  },

  render: function() {
    this.$el.append(this.template());
  },

  autosearch: function (){
    var partial = $('#playerSearch').val()
    if(times){
      clearTimeout('times');
    }
    var times = setTimeout(function (){
      $.ajax({
        url: 'users/searching/' + partial,
        type: 'GET',
        success: function(data){
          // redo this
          if(data.length){
            console.log(data);
          }
        } 
      });
    }, 750);
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