ht.Templates.GameHeaderTemplate = _.template(''+
  '<header>'+
    '<span><%= prompt %></span>'+
    '<% for(var i = 0; i < players.length; i++) { %>'+
      '<% if (players[i].isJ) { %>'+
        '<div style="color:blue;"><%= players[i].username %></div>'+
      '<% } else { %>'+
        '<div><%= players[i].username %></div>'+
      '<% } %>'+
    '<% } %>'+
  '</header>'+
'');