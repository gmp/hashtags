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

  autosearch: function () {
    var partial = $('#playerSearch').val()
    if(times){
      clearTimeout('times');
    }
    var times = setTimeout(function() {
      $.ajax({
        url: 'users/searching/' + partial,
        type: 'GET',
        success: function(data){
          $('#nameSearchDropDown').empty();
          if(data.length){
            console.log(data);
            //Displays all possible users whose usernames match with what the current user has typed so far.
            _.each(data, function(name){
              $('#nameSearchDropDown').append('<li class="name" data-username="'+name.username+'"><img class="avatar-supersmall" src="'+name.avatarURL+'">'+name.username+'</li>');
            });
          }
        }
      });
    }, 750);
  },

  search: function(e) {
    var self = this;
    var playerName = $(e.target).data('username');
    $.ajax({
      url: '/users/search/'+playerName,
      type: 'GET',
      success: function(data) {
        ht.dispatcher.trigger('addInvited', data, self.attributes.player);
      },
      error: function() {
        console.log('error');
      }
    });
  }

});