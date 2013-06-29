ht.Views.PlayerImageSelectView = Backbone.View.extend({

  className: 'image-select',

  template: ht.Templates.PlayerImageSelectTemplate,

  initialize: function() {
    this.getMedia();
    this.render();
  },

  events: {
    'click .media-select': 'submit'
  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({hashtag: this.options.hashtag}));
  },

  getMedia: function() {
    var self = this;
    var hashtagQuery = this.options.hashtag;
    var accessToken = this.options.user.attributes.accessToken;
    hashtagQuery = hashtagQuery.slice(1);
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
        htmlChunk += '<div class="media-container"><img src="'+image.images.standard_resolution.url+'"><button data-url="'+image.images.standard_resolution.url+'" class="media-select">Select</button></div>';
      } else if (media[i].type === "video") {
        var video = media[i];
        htmlChunk += '<div class="media-container"><video src="'+video.videos.standard_resolution.url+'"></video><button data-url"'+video.videos.standard_resolution.url+' class="media-select">Select</button></div>';
      }
    }
    this.$el.append(htmlChunk);
  },

  submit: function(e) {
    var submissionUrl = $(e.target).data('url');
    var hashtag = this.options.hashtag;
    ht.dispatcher.trigger('mediaSelect', submissionUrl, hashtag);
  }

});
