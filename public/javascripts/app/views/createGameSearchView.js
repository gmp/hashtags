ht.Views.CreateGameSearchView = Backbone.View.extend({

  className: 'search',

  template: ht.Templates.CreateGameSearchTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'keyup #playerSearch': 'autosearch',
    'click .name': 'search'
  },

  render: function() {
    var names = this.autosearch();
    this.$el.append(this.template({names: names}));
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
            $('#nameSearchDropDown').empty();
            _.each(data, function(name){
              $('#nameSearchDropDown').append('<li class="name">'+name.username+'</li>');
            });
          }
        }
      });
    }, 750);
  },

  search: function(e) {
    var self = this;
    var playerName = e.target.innerHTML;
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