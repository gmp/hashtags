ht.Templates.GameEndTemplate = _.template(''+
  '<div class="game-header row text-center fixed">'+
    '<div class="small-11 small-centered columns">'+
      '<h6><%= prompt %><h6>'+
      '<p id="winner">Winner: <%= winner %></p>'+
    '</div>'+
  '</div>'+
  '<div class="row text-center">'+
    '<div class="small-11 small-centered columns">'+
      '<table>'+
      '<thead>'+
        '<tr>'+
          '<% _.each(playersWithScore, function(player) { %>'+
            '<th><%= player.username %></th>'+
          '<% }); %>'+
        '</tr>'+
      '</thead>'+
      '<tbody>'+
        '<tr>'+
          '<% _.each(playersWithScore, function(player) { %>'+
            '<td><%= player.score %></td>'+
          '<% }); %>'+
        '</tr>'+
      '</tbody>'+
      '</table>'+
    '</div>'+
  '</div>'+
  '<% _.each(players, function(player) { %>'+
      '<div class="row text-center">'+
        '<div class="small-11 small-centered columns">'+
          '<% if(player.username === myPlayer.username) { %>'+
            '<h4>You submitted:</h4>'+
          '<% } else { %>'+
            '<h4><%= player.username %> submitted:</h4>'+
          '<% } %>'+
          '<div class="text-left">'+
          '<% if(player.username === winner) { %>'+
            '<span class="ribbon">Winner!</span>'+
          '<% } %>'+
          '<% if(player.submission.type === "image") { %>'+
            '<img class="media" src="<%= player.submission.url %>">'+
          '<% } else { %>'+
            '<video class="media" src="<%= player.submission.url %>"></video>'+
          '<% } %>'+
          '</div>'+
            '<h4>#<%= player.submission.hashtag %></h4>'+
        '</div>'+
      '</div>'+
  '<% }); %>'+
  '<div class="row">'+
    '<div class="small-9 small-centered columns">'+
      '<button class="expand success" id="continue">Continue</button>'+
    '</div>'+
  '</div>'+
  '<div class="row">'+
    '<div class="small-9 small-centered columns">'+
      '<a href="/#lobby/<%= myPlayer.userGlobalId %>" class="button expand">Back to lobby</a>'+
    '</div>'+
  '</div>'+
'');
