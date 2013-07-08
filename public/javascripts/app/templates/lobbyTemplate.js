ht.Templates.LobbyTemplate = _.template(''+
  '<div class="row lobby-header">'+
    '<div class="small-3 columns">'+
      '<img src="<%= avatarURL %>">'+
    '</div>'+
    '<div class="small-5 small-centered columns">'+
      '<h2>#Lobby</h2>'+
    '</div>'+
    '<div class="small-2 columns">'+
      '<button data-modal-id="new-game-modal" id="new-game-button" class="small button">+</button><br>'+
    '</div>'+
  '</div>'+
  '<% if (games.length === 0 && invites.length === 0 && pendingGames.length === 0) { %>'+
    '<div class="row noGames">'+
      '<div class="small-10 small-centered columns">'+
        '<p>You have no games!<br><br>Click the [+]<br>to get started</p>'+
      '</div>'+
    '</div>'+
  '<% } %>'+
  '<div id="new-game-modal" class="new-game-modal">'+
    '<div class="small-centered columns">'+
      '<button class="small" id="start-new-game">Start a new game</button><br>'+
      '<button class="small" id="join-random">Join a random game</button><br>'+
      '<button class="small" id="cancel">Cancel</button>'+
    '</div>'+
  '</div>'+
'');
