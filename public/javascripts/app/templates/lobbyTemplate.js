ht.Templates.LobbyTemplate = _.template(''+
  '<div class="lobby-container">'+
    '<div class="lobby-header">'+
      '<img class="avatar" src="<%= avatarURL %>">'+
      '<h1>#Lobby</h1>'+
      '<button data-modal-id="new-game-modal" class="new-game-button">+</button><br>'+
    '</div>'+
    '<% if (games.length) { %>'+
      '<% for(var i = 0; i < games.length; i++) { %>'+
        '<div><a href="/#game/<%= games[i] %>"> game <%=[i] %></a></div>'+
      '<% } %>'+
    '<% } else { %>'+
      '<div class="intro"><p>To get the party started, begin  a new game or join a random game</div>'+
    '<% } %>'+
    '<div id="new-game-modal" class="new-game-modal">'+
      '<button id="start-new-game">Start a new game</button><br>'+
      '<button id="join-random">Join a random game</button><br>'+
      '<button id="cancel">Cancel</button>'+
    '</div>'+
  '</div>'+
'');