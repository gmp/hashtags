ht.Views.CreateGameView = Backbone.View.extend({

  className: 'create-game',

  template: ht.Templates.CreateGameTemplate,

  initialize: function(options) {
    _.bindAll(this, 'addInvited');
    options.dispatcher.bind('addInvited', this.addInvited)
    this.render();
  },

  events: {
    'click #cancel': 'cancel',
    'click .avatar-contain': 'searchStart'
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  },

  cancel: function() {
    this.remove();
    ht.router.back();
  },

  addInvited: function(){
    console.log('dispatched');
  },

  searchStart: function() {
    this.$el.append(new ht.Views.CreateGameSearchView({dispatcher: ht.dispatcher}).el);
  }

});