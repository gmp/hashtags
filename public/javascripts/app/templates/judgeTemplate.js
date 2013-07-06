ht.Templates.JudgeTemplate = _.template(''+
  '<div>You\'re the judge</div>'+
  '<% if(remainingSubs) { %>'+
    '<h4>Awaiting <%= remainingSubs %> submissions</h4>'+
  '<% } else { %>'+
    '<h4>Ready to vote!</h4>'+
  '<% } %>'+
  '<% _.each(players, function(player) { %>'+
    '<% if(player.submitted) { %>'+
      '<div class="row text-center">'+
        '<div class="small-11 small-centered columns">'+
          '<% if(player.submission.type === "image") { %>'+
            '<img class="media" src="<%= player.submission.url %>">'+
            '<h4>#<%= player.submission.hashtag %></h4>'+
            '<button class="media-select expand" data-submittedby="<%= player.username %>" data-submittedUrl="<%= player.submission.url %>">Choose Image</button>'+
          '<% } else { %>'+
            '<video class="media" src="<%= player.submission.url %>"></video>'+
            '<h4>#<%= player.submission.hashtag %></h4>'+
            '<button class="expand" data-submittedby="<%= player.username %>" data-submittedUrl="<%= player.submission.url %>">Choose Video</button>'+
          '<% } %>'+
        '</div>'+
      '</div>'+
    '<% } %>'+
  '<% }); %>'+
  '<div class="row">'+
    '<div class="small-9 small-centered columns">'+
      '<a href="/#lobby/<%= myPlayer.userGlobalId %>" class="button expand">Back to lobby</a>'+
    '</div>'+
  '</div>'+
'');