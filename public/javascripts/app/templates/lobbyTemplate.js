ht.Templates.LobbyTemplate = _.template(''+
  '<div class="lobby-container">'+
    '<div class="lobby-header">'+
      '<img class="avatar" src="<%= avatarURL %>">'+
      '<h1>#Lobby</h1>'+
      '<button class="new-game">+</button><br>'+
    '</div>'+
    '<% if (games.length) { %>'+
      '<div class="games-container">Some games should go here. Possibly a gamesListView??</div>'+
    '<% } else { %>'+
      '<div class="intro"><p>To get the party started, begin  a new game or join a random game</div>'+
    '<% } %>'+
  '</div>'+
'');