ht.Templates.GameTemplate = _.template(''+
  '<div class="game-container">'+
    '<div class="game-header">'+
      '<h1>#Game</h1>'+
      '<% for(var i = 0; i < players.length; i++) { %>'+
        '<% if (players[i].isJ) { %>'+
          '<h1><%= players[i].username %></h1>'+
        '<% } else { %>'+
          '<div><%= players[i].username %></div>'+
        '<% } %>'+
      '<% } %>'+
    '</div>'+
  '</div>'+
'');