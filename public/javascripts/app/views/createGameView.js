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
    var self = this;
    var obj = {};
    obj.gameAdmin = this.model.get('_id');
    obj.player2 = this.player2._id;
    obj.player3 = this.player3._id;
    obj.player4 = this.player4._id;
    obj.title = $('#gameTitle').val();
    console.log(obj);
    $.ajax({
      url: '/invite/create',
      type:'POST',
      data: obj,
      success: function(){
        self.remove();
        ht.router.navigate('/lobby/'+self.model.get('_id'), {trigger: true});
      },
      error: function(a, b, err){
        console.log(err);
      }
    });
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