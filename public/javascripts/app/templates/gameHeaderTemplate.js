ht.Templates.GameHeaderTemplate = _.template(''+
  '<header>'+
    '<span><%= prompt %></span>'+
    '<% _.each(players, function(player) { %>'+
      '<% if (player.isJ) { %>'+
        '<div style="color:blue;"><%= player.username %></div>'+
      '<% } else { %>'+
        '<div><%= player.username %></div>'+
      '<% } %>'+
    '<% }); %>'+
  '</header>'+
'');