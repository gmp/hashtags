ht.Templates.LobbyTemplate = _.template(''+
  '<div class="lobby-container">'+
    '<div class="lobby-header">'+
      '<img class="avatar" src="<%= avatarURL %>">'+
      '<h1>#Lobby</h1>'+
      '<button class="new-game">+</button><br>'+
    '</div>'+
    '<% if (games.length) { %>'+
      '<div>Some games should go here</div>'+
    '<% } else { %>'+
      '<img class="arrow" src="http://www.clker.com/cliparts/Z/r/U/H/8/O/embedded-blue-arrow-point-left-hi.png">'+
      '<div class="intro"><p>To get the party started, begin  a new game or join a random game</div>'+
    '<% } %>'+
  '</div>'+
'');