ht.Views.CreateGameView = Backbone.View.extend({

  className: 'create-game',

  template: ht.Templates.CreateGameTemplate,

  initialize: function(options) {
    _.bindAll(this, 'addInvited');
    options.dispatcher.bind('addInvited', this.addInvited);
    this.render();
  },

  events: {
    'click #cancel': 'cancel',
    'click .avatar-contain': 'searchStart',
    'click #start': 'sendInvitations'
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  },

  cancel: function() {
    this.remove();
    ht.router.back();
  },

  sendInvitations: function(){
    console.log('triggered sending');
    //$.ajax.post
  },

  addInvited: function(data, player){
    this[player] = data;
    $('#'+player).css('background-image', "url("+data.avatarURL+")");
    if(this.player2 && this.player3 && this.player4){
      this.$el.append('<div><button id="start">Start The Game!</button></div>');
    }
  },

  searchStart: function() {
    console.log(event.target.id);
    this.$el.append(new ht.Views.CreateGameSearchView({player: event.target.id, dispatcher: ht.dispatcher}).el);
  }

});