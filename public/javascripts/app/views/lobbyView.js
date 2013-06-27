ht.Views.LobbyView = Backbone.View.extend({

  template: ht.Templates.LobbyTemplate,

  initialize: function() {
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
    var modalId = $(event.target).data('modal-id'),
        $modal = $('#'+modalId);
    $modal.fadeIn(300);
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
    console.log('create game clicked');
    ht.router.navigate('/lobby/'+this.model.id+'/new');
  }
});