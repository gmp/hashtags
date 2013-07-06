ht.Templates.GameEndTemplate = _.template(''+
  '<div class="game-header row">'+
    '<div class="small-11 small-centered columns">'+
      '<h6><%= prompt %><h6>'+
    '</div>'+
    '<div class="row">'+
      '<div class="small-5 small-centered columns">'+
        '<p id="winner">Winner: <%= winner %></p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<% _.each(playersWithScore, function(player) { %>'+
    '<div><span class="scoreBoard"><%= player.username %>: </span><span class="scoreNumber"><%= player.score %></span></div>'+
  '<% }); %>'+
  '<% _.each(players, function(player) { %>'+
    '<div class="row text-center">'+
      '<div class="small-11 small-centered columns">'+
          '<% if(player.username === myPlayer.username) { %>'+
            '<h4>You submitted:</h4>'+
          '<% } else { %>'+
            '<h4><%= player.username %> submitted:</h4>'+
          '<% } %>'+
        '<% if(player.submission.type === "image") { %>'+
          '<img class="media" src="<%= player.submission.url %>">'+
          '<h4>#<%= player.submission.hashtag %></h4>'+
        '<% } else { %>'+
          '<video class="media" src="<%= player.submission.url %>"></video>'+
          '<h4>#<%= player.submission.hashtag %></h4>'+
        '<% } %>'+
      '</div>'+
    '</div>'+
  '<% }); %>'+
  '<div class="row">'+
    '<div class="small-9 small-centered columns">'+
      '<button class="expand" id="continue">Continue</button>'+
    '</div>'+
  '</div>'+
  '<div class="row">'+
    '<div class="small-9 small-centered columns">'+
      '<a href="/#lobby/<%= myPlayer.userGlobalId %>" class="button expand">Back to lobby</a>'+
    '</div>'+
  '</div>'+
'');