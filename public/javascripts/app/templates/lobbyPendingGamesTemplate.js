ht.Templates.LobbyPendingGamesTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<section >'+
        '<p class="title <%=pendingGames[i].declined %>"  id = <%=pendingGames[i]._id%> data-section-title>Pending: <%= pendingGames[i].title %></p>'+
        '<% if(pendingGames[i].declined === "declined"){ %>' +
            '<p class="declineMessage">Another invitee has declined this game. Click above to remove from your games queue. </p>' +
        '<% } %>' +
        '<div class="content" data-section-content>'+
          '</p> Waiting on <%= pendingGames[i].waiting %> more players'+
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');
