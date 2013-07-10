ht.Views.CreateGameView = Backbone.View.extend({

  className: 'create-game',

  template: ht.Templates.CreateGameTemplate,


  searchVisible: false,


  initialize: function(options) {
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.render();
  },


  events: {
    'keypress input[name=gameTitle]': 'removeError',
    'click #cancel': 'cancel',
    'click .avatar-contain': 'searchStart',
    'click #start': 'sendInvitations'
  },

  dispatcher_events: {
    'addInvited': 'addInvited'
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
  },

  cancel: function() {
    this.doubleTap('addInvited');
    ht.router.back();
  },

  removeError: function(e) {
    if (this.gameTitle && this.gameTitle.hasClass('error')) {
      $('#invalid').remove();
      this.gameTitle.removeClass('error');
    }
  },

  sendInvitations: function() {
    this.gameTitle = $('input[name=gameTitle]');
    if (!this.gameTitle.val()) {
      this.gameTitle.after('<small id="invalid" class="error">Please add a game title</small>');
      return this.gameTitle.addClass('error');
    }
    $('#startGameButton').hide();
    var self = this;
    var obj = {};
    obj.author = this.model.get('username');
    obj.gameAdmin = {user: this.model.get('_id'), username: this.model.get('username'), avatarURL: this.model.get('avatarURL')};
    obj.player2 = {user: this.player2._id, username: this.player2.username, avatarURL: this.player2.avatarURL, accepted: 'waiting'};
    obj.player3 = {user: this.player3._id, username: this.player3.username, avatarURL: this.player3.avatarURL, accepted: 'waiting'};
    obj.player4 = {user: this.player4._id, username: this.player4.username, avatarURL: this.player4.avatarURL, accepted: 'waiting'};
    obj.title = this.gameTitle.val();
    $.ajax({
      url: '/invite/create',
      type:'POST',
      data: obj,
      success: function() {
        self.doubleTap('addInvited');
        ht.router.navigate('/lobby/'+self.model.get('_id'), {trigger: true});
      },
      error: function(a, b, err) {
        console.log(err);
      }
    });
  },

  addInvited: function(data, player) {
    this.searchView.remove();
    this.searchVisible = false;
    this[player] = data;
    $('#'+player).attr('src', data.avatarURL);
    if(this.player2 && this.player3 && this.player4){
      $('#startGameButton').show();
    }
  },

  searchStart: function(e) {
    if(this.searchVisible) {
      this.searchView.remove();
      this.searchVisible = false;
    } else {
      this.searchView = new ht.Views.CreateGameSearchView({attributes: {player: e.target.id}});
      this.searchVisible = true;
      this.$el.find('#game-title-form').after(this.searchView.el);
    }
  }

});
