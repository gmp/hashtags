ht.Templates.LobbyPendingGamesTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<section class = <%=pendingGames[i].declined %>>'+
        '<p class="title" id = <%=pendingGames[i]._id%> data-section-title>Pending: <%= pendingGames[i].title %></p>'+
        '<% if(pendingGames[i].declined === "declined"){ %>' +
            '<p>Another invitee has declined this game. Click above to remove from your games queue. </p>' +
        '<% } %>' +
        '<div class="content" data-section-content>'+
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');
