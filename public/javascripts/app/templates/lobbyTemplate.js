ht.Templates.LobbyTemplate = _.template(''+
  '<div class="lobby-header">'+
    '<img class="avatar" src="<%= avatarURL %>">'+
    '<h1>#Lobby</h1>'+
    '<button data-modal-id="new-game-modal" class="new-game-button">+</button><br>'+
  '</div>'+
  '<div>Invitations</div>'+
   '<% if (invites.length) { %>'+
    '<% for(var i = 0; i < invites.length; i++) { %>'+
      '<div><button><%=invites[i].author %></button></div>'+
    '<% } %>'+
  '<% } else { %>'+
    '<div class="intro"><p>no new invitations</p></div>'+
  '<% } %>'+
  '<div>Games</div>'+
  '<% if (games.length) { %>'+
    '<% for(var i = 0; i < games.length; i++) { %>'+
      '<div><a href="/#game/<%= games[i] %>"><%=games[i].title %></a></div>'+
    '<% } %>'+
  '<% } else { %>'+
    '<div class="intro"><p>To get the party started, begin  a new game or join a random game</div>'+
  '<% } %>'+
  '<div>Pending Games</div>'+
   '<% if (pendingGames.length) { %>'+
    '<% for(var i = 0; i < pendingGames.length; i++) { %>'+
      '<div><span><%=pendingGames[i].author %></span></div>'+
    '<% } %>'+
  '<% } else { %>'+
    '<div class="intro"><p>no pending games</p></div>'+
  '<% } %>'+
  '<div id="new-game-modal" class="new-game-modal">'+
    '<button id="start-new-game">Start a new game</button><br>'+
    '<button id="join-random">Join a random game</button><br>'+
    '<button id="cancel">Cancel</button>'+
  '</div>'+
'');