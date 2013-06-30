ht.Templates.GameWaitingTemplate = _.template(''+
  '<% for(var i = 0; i < players.length; i++) { %>'+
    '<% if(players[i].submitted) { %>'+
      '<% if(players[i].submission.type === "image") { %>'+
        '<img src="<%= players[i].submission.url %>">'+
      '<% } else { %>'+
        '<video src="<%= players[i].submission.url %>"></video>'+
      '<% } %>'+
    '<% } %>'+
  '<% } %>'+
'');