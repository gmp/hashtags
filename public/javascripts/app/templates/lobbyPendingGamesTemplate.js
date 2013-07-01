ht.Templates.LobbyPendingGamesTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<section>'+
        '<p class="title" data-section-title>Pending: <%= pendingGames[i].title %></p>'+
        '<div class="content" data-section-content>'+
          '</p> Waiting on <%= pendingGames[i].waiting %> more players'+
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');