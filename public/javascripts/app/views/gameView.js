ht.Views.GameView = Backbone.View.extend({

  className: 'game',

  initialize: function() {

    this.joinGame();

    // on enter game, trigger enterGame event and send data to dispatcher to talk through socket
    // ht.dispatcher.trigger('enterGame', {playerId: this.attributes.user.id, gameId: this.model.id});

    // create reference to current player in game model's players array
    this.myPlayer = ht.Helpers.getMyPlayer(this.model, this.attributes.user.id);
    this.render();

    _.bindAll(this, 'mediaSelect', 'judgeSelect');
    ht.dispatcher.on('mediaSelect', this.mediaSelect);
    ht.dispatcher.on('judgeSelect', this.judgeSelect);
  },

  events: {
    'click button' : 'handleClick'
  },

  render: function() {
    this.$el.empty();

    this.$el.append(new ht.Views.GameHeaderView({ model: this.model }).el);

    if(this.model.get('gameEnd')){
      this.subView = new ht.Views.GameEndView({
        model: this.model.get('previousRound'),
        attributes: {
          myPlayer: this.myPlayer
        }
      });
      this.$el.append(this.subView.el);
    } else if(this.myPlayer.isJ){
      this.subView = new ht.Views.JudgeView({
        model: this.model,
        attributes: {
          myPlayer: this.myPlayer
        }
      });
      this.$el.append(this.subView.el);

    } else {
      this.subView = new ht.Views.PlayerView({
        model: this.model,
        attributes: {
          user: this.attributes.user,
          myPlayer: this.myPlayer
        }
      });
      this.$el.append(this.subView.el);
    }
  },

  joinGame: function(){
    ht.dispatcher.trigger('joinGame', this.model.get('id'));
  },

  mediaSelect: function(submissionUrl, type, hashtag) {
    var players = this.model.get('players');
    var player = players[this.attributes.user.id];
    player.submitted = true;
    player.submission = {url: submissionUrl, type: type, hashtag: hashtag};
    this.model.set('players', players);
    var selfie = this;
    this.model.save(player, {
      patch: true,
      success: function(obj){
        selfie.model.fetch({
          success: function (obj, res){
            selfie.model = obj;
            selfie.subView.render();
          },
          error: function (){
            console.log('what the fuck');
          }
        });
      },
      error: function(){
        console.error('bummer dude');
      }
    });
  },

  judgeSelect: function(prevRound) {
    this.render();
  }

});