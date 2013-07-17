ht.Views.GameView = Backbone.View.extend({

  className: 'gameView',

  initialize: function() {
    ht.Helpers.delegateCustomEvents(ht.dispatcher, this.dispatcher_events, this);
    this.myPlayer = ht.Helpers.getMyPlayer(this.model, this.attributes.user.id);
    this.joinGame();
    this.render();
  },

  dispatcher_events: {
    'mediaSelect': 'mediaSelect',
    'judgeSelect': 'judgeSelect',
    'continued': 'continued'
  },

  render: function() {
    ht.Helpers.scrollTop();
    this.$el.empty();
    if(!this.myPlayer.continued) {
      if(this.subView) this.subView.doubleTap(this.subView.dispatcher_events);
      this.subView = new ht.Views.GameEndView({
        model: this.model,
        attributes: {
          myPlayer: this.myPlayer
        }
      });
      this.$el.append(this.subView.el);
    } else {
      this.$el.append(new ht.Views.GameHeaderView({ model: this.model }).el);
      if(this.myPlayer.isJ) {
        if(this.subView) this.subView.doubleTap(this.subView.dispatcher_events);
        this.subView = new ht.Views.JudgeView({
          model: this.model,
          attributes: {
            myPlayer: this.myPlayer
          }
        });
        this.$el.append(this.subView.el);
      } else {
      if(this.subView) this.subView.doubleTap(this.subView.dispatcher_events);
        this.subView = new ht.Views.PlayerView({
          model: this.model,
          attributes: {
            user: this.attributes.user,
            myPlayer: this.myPlayer
          }
        });
        this.$el.append(this.subView.el);
      }
    }
  },

  joinGame: function() {
    ht.dispatcher.trigger('joinGame', this.model.get('id'));
  },

  mediaSelect: function() {
    var selfie = this;
    this.model.fetch({
      success: function (model, res) {
        selfie.subView.doubleTap(this.dispatcher_events);
        selfie.render();
      },
      error: function (){
        console.log('error');
      }
    });
  },

  judgeSelect: function() {
    var selfie = this;
    this.model.fetch({
      success: function() {
        selfie.myPlayer = ht.Helpers.getMyPlayer(selfie.model, selfie.attributes.user.id);
        selfie.render();
      }
    });
  },

  continued: function() {
    this.myPlayer = ht.Helpers.getMyPlayer(this.model, this.attributes.user.id);
    this.render();
  }

});
