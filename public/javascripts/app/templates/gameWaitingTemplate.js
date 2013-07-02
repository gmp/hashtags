ht.Templates.GameWaitingTemplate = _.template(''+
  '<% _.each(players, function(player) { %>'+
    '<% if(player.submitted) { %>'+
      '<div class="row text-center">'+
        '<div class="small-11 small-centered columns">'+
          '<% if(player.submission.type === "image") { %>'+
            '<h4><%= player.username %> submitted:</h4>'+
            '<img class="media" src="<%= player.submission.url %>">'+
            '<h4><%= player.submission.hashtag %></h4>'+
          '<% } else { %>'+
            '<h4><%= player.username %> submitted:</h4>'+
            '<video class="media" src="<%= player.submission.url %>"></video>'+
            '<h4><%= player.submission.hashtag %></h4>'+
          '<% } %>'+
        '</div>'+
      '</div>'+
    '<% } %>'+
  '<% }); %>'+
'');