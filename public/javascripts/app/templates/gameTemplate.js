ht.Templates.GameTemplate = _.template(''+
  '<div class="game-container">'+
    '<div class="game-header">'+
      '<h1>#Game</h1>'+
      '<% for(var i = 0; i < players.length; i++) { %>'+
        '<% if (players[i].isJ) { %>'+
          '<div style="color:blue;"><%= players[i].username %></div>'+
        '<% } else { %>'+
          '<div><%= players[i].username %></div>'+
        '<% } %>'+
      '<% } %>'+
    '</div>'+
  '</div>'+
'');