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
    var self = this;
    var $papaDiv = $('<div class="inviteAuto"></div>');
    var $data = $('<ul></ul>');

    var times = setTimeout(function (){
      $.ajax({
        url: 'users/searching/' + partial,
        type: 'GET',
        success: function(data){
          // redo this
          if(data.length){
            $papaDiv.empty();
            $data.empty();
            var $listelement;
            console.log(data);
            _.each(data, function(item){
              console.log(item);
              $listelement = $('<li></li>');
              $listelement.text(item.username);
              $data.append($listelement);
            });
          }
          self.$el.append($papaDiv);
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