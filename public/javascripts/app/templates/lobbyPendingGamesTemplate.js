ht.Templates.LobbyPendingGamesTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<p class="title" data-section-title>Pending game: <%= pendingGames[i].title %></p>'+
      '<div class="content" data-section-content>'+
        '<% if (pendingGames[i].declined) { %>'+
          '<p class="red">Ugh! One of your stupid friends decided not to play.</p>'+
          '<button class="declined small expand error" id="<%=pendingGames[i]._id%>">Remove game</button>'+
        '<% } else { %>' +
          '<p>Waiting on some more of your friends to join.</p>'+
        '<% } %>' +
      '</div>'+
    '<% } %>'+
  '</div>'+
'');
