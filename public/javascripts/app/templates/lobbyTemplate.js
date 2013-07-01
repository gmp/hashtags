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
  '<div id="new-game-modal" class="new-game-modal">'+
    '<div class="small-centered columns">'+
      '<button class="small" id="start-new-game">Start a new game</button><br>'+
      '<button class="small" id="join-random">Join a random game</button><br>'+
      '<button class="small" id="cancel">Cancel</button>'+
    '</div>'+
  '</div>'+
'');