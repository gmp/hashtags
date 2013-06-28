ht.Templates.CreateGameTemplate = _.template(''+
  '<button id="cancel">Cancel</button>'+
  '<h3>Create a game</h3>'+
  '<span>Game Title: </span><input type="text">'+
  '<div class="avatar-row">'+
    '<div class="avatar-contain" id="player1"><img class="avatar" src="<%= avatarURL %>"></div>'+
    '<div class="avatar-contain" id="player2"></div>'+
  '</div>'+
  '<div class="avatar-row">'+
    '<div class="avatar-contain" id="player3"></div>'+
    '<div class="avatar-contain" id="player4"></div>'+
  '</div>'+
'');