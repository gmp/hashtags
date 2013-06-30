ht.Views.LobbyView = Backbone.View.extend({

  className: 'lobby',

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
    ht.dispatcher.trigger('createSockets');
    this.render();
  },

  events: {
    'click .new-game-button': 'modalShow',
    'click #cancel, #mask': 'modalHide',
    'click #start-new-game': 'createGame'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  },

  modalShow: function(event) {
    $('#new-game-modal').fadeIn(300);
    this.$el.append('<div id="mask" class="mask"></div>');
    $('#mask').fadeIn(300);
  },

  modalHide: function() {
    $('#mask, #new-game-modal').fadeOut(300, function() {
      $('#mask').remove();
    });
  },

  createGame: function() {
    this.modalHide();
    ht.router.navigate('/lobby/'+this.model.id+'/new', {trigger: true});
  }
});