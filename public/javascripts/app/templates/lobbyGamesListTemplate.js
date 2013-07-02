ht.Templates.LobbyGamesListTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < games.length; i++) { %>'+
      '<section>'+
        '<p class="title game" data-section-title><i class="icon-reorder menu-icon"></i> | <%= games[i].title %></p>'+
        '<div class="content" data-section-content>'+
          '<ul class="no-bullet">'+
            '<li><b>Prompt:</b> <%= games[i].prompt %></li>'+
            '<li><b>Judge:</b> <%= games[i].judge.username %></li>'+
            '<li><b>Players:</b></li>'+
            '<ul class="inline-list">'+
            '<% for(var j = 0; j < games[i].players.length; j++) { %>'+
              '<li><%= games[i].players[j].username %><span><%= games[i].players[j].score %></span></li>'+
            '<% } %>'+
            '</ul>'+
            '<li><a class="button small expand" href="/#game/<%= games[i].gameId %>">Play!</a></li>'+
          '</ul>'+
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');