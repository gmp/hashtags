ht.Templates.LobbyPendingGamesTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<section>'+
        '<% if (pendingGames[i].declined) { %>'+
          '<p class="title pending game strike" data-section-title>Pending game: <%= pendingGames[i].title %></p>'+
          '<% } else { %>' +
          '<p class="title pending game" data-section-title>Pending game: <%= pendingGames[i].title %></p>'+
          '<% } %>' +
          '<div class="content" data-section-content>'+
        '<% if (pendingGames[i].declined) { %>'+
            '<p class="red">Ugh! One of your stupid friends decided not to play.</p>'+
            '<button class="declined small expand" id="<%=pendingGames[i]._id%>">Remove game</button>'+
          '<% } else { %>' +
            '<p>Hang tight. <br>We\'re waiting on some more friends to join.</p>'+
          '<% } %>' +
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');
