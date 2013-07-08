ht.Views.PlayerImageSelectView = Backbone.View.extend({

  className: 'image-select',

  template: ht.Templates.PlayerImageSelectTemplate,

  initialize: function() {
    this.getMedia();
    this.render();
  },

  events: {
    'click .media-select': 'submitMedia',
    'click video': 'playVideo'
  },

  render: function() {
    ht.Helpers.scrollTop();
    this.$el.empty();
    this.$el.append(this.template({hashtag: this.attributes.hashtag}));
  },

  getMedia: function() {
    var self = this;
    var hashtagQuery = this.attributes.hashtag;
    var accessToken = this.attributes.accessToken;
    console.log(hashtagQuery);
    $.ajax({
      url: 'https://api.instagram.com/v1/tags/'+hashtagQuery+'/media/recent?access_token='+accessToken+'',
      dataType: 'jsonp',
      success: function(response) {
        console.log('get images response', response);
        self.addMedia(response.data);
      },
      error: function(error) {
        console.log('get images error:', error);
        self.$el.append('<p>There was an error getting images,<br>would you like to try again?</p>');
      }
    });
  },

  addMedia: function(media) {
    var htmlChunk = '';
    for (var i = 0, l = media.length; i < l; i++) {
      if (media[i].type === "image") {
        var image = media[i];
        htmlChunk += '<div class="text-center media-container row">'+
                        '<div class="small-11 small-centered columns">'+
                          '<img class="media" src="'+image.images.low_resolution.url+'">'+
                          '<button data-type ="'+image.type+'" data-url="'+image.images.low_resolution.url+'" class="media-select expand">Submit Image</button>'+
                        '</div>'+
                      '</div>';
      } else if (media[i].type === "video") {
        var video = media[i];
        htmlChunk += '<div class="text-center media-container row">'+
                        '<div class="small-11 small-centered columns">'+
                          '<video class="media" src="'+video.videos.low_resolution.url+'"></video>'+
                          '<button data-type ="'+video.type+'" data-url="'+video.videos.low_resolution.url+'" class="media-select expand">Submit Video</button>'+
                        '</div>'+
                      '</div>';
      }
    }
    this.$el.append(htmlChunk);
  },

  submitMedia: function(e) {
    var selfie = this;
    var submissionUrl = $(e.target).data('url');
    var type = $(e.target).data('type');
    var hashtag = this.attributes.hashtag;
    var players = this.model.get('players');
    var player = players[this.attributes.myPlayer.userGlobalId];
    player.submitted = true;
    player.submission = {url: submissionUrl, type: type, hashtag: hashtag};
    this.model.set('players', players);
    this.model.save(player, {
      patch: true,
      success: function(model, res){
        selfie.model.unsetChanges();
        ht.dispatcher.trigger('mediaSelect', model);
        selfie.remove();
      },
      error: function(){
        console.error('bummer dude');
      }
    });
  },

  playVideo: function(e) {
    e.target.play();
  }

});
