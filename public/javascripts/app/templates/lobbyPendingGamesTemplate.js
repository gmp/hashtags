ht.Templates.LobbyPendingGamesTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<section class = <%=pendingGames[i].declined %>>'+
        '<p class="title" data-section-title>Pending: <%= pendingGames[i].title %></p>'+
        '<div class="content" data-section-content>'+
          '<% if(pendingGames[i].declined === "declined"){ %>' +
            '<p>Another invitee has declined this game. Click here to remove from your games queue. </p>' +
          '<% } else { %>' +
            '</p> Waiting on <%= pendingGames[i].waiting %> more players'+
          '<% } %>' +
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');
