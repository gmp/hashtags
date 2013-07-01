ht.Templates.LobbyGamesListTemplate = _.template(''+
  '<div class="section-container accordian" data-section="accordian">'+
    '<% for(var i = 0; i < games.length; i++) { %>'+
      '<section>'+
        '<p class="title" data-section-title><%= games[i].title %></p>'+
        '<div class="content" data-section-content>'+
          '<ul class="no-bullet">'+
            '<li>Prompt: <%= games[i].prompt %></li>'+
            '<li>Judge: <%= games[i].judge %></li>'+
            '<li>Players:</li>'+
            // '<% for(var j = 0; j < games[i].players.length; j++) { %>'+
            //   '<li>games.[i].players[j].username</li>'+
            // '<% } %>'+
          '</ul>'+
        '</div>'+
      '</section>'+
    '<% } %>'+
  '</div>'+
'');