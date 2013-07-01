ht.Templates.GameWaitingTemplate = _.template(''+
  '<% _.each(players, function(player) { %>'+
    '<% if(player.submitted) { %>'+
      '<% if(player.submission.type === "image") { %>'+
        '<img src="<%= player.submission.url %>">'+
      '<% } else { %>'+
        '<video src="<%= player.submission.url %>"></video>'+
      '<% } %>'+
    '<% } %>'+
  '<% }); %>'+
'');