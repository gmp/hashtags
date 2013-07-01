ht.Templates.LobbyTemplate = _.template(''+
  '<div class="row lobby-header">'+
    '<div class="small-3 columns">'+
      '<img class="avatar" src="<%= avatarURL %>">'+
    '</div>'+
    '<div class="small-5 small-centered columns">'+
      '<h2>#Lobby</h2>'+
    '</div>'+
    '<div class="small-2 columns">'+
      '<button data-modal-id="new-game-modal" class="small button new-game-button">+</button><br>'+
    '</div>'+
  '</div>'+
<<<<<<< HEAD
=======
  '<div>Invitations</div>'+
   '<% if (invites.length) { %>'+
    '<% for(var i = 0; i < invites.length; i++) { %>'+
      '<div><button id="invite"><%=invites[i].author %></button></div>'+
    '<% } %>'+
  '<% } else { %>'+
    '<div class="intro"><p>no new invitations</p></div>'+
  '<% } %>'+
  '<div>Games</div>'+
  '<% if (games.length) { %>'+
    '<% for(var i = 0; i < games.length; i++) { %>'+
      '<div><a href="/#game/<%= games[i].gameId %>"><%=games[i].title %></a></div>'+
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
>>>>>>> 9a2195a4a06d3d76f623fda39b46258fbcd396f1
  '<div id="new-game-modal" class="new-game-modal">'+
    '<div class="small-centered columns">'+
      '<button class="small" id="start-new-game">Start a new game</button><br>'+
      '<button class="small" id="join-random">Join a random game</button><br>'+
      '<button class="small" id="cancel">Cancel</button>'+
    '</div>'+
  '</div>'+
'');