ht.Templates.GameWaitingTemplate = _.template(''+
  '<% _.each(players, function(player) { %>'+
    '<% if(player.submitted) { %>'+
      '<% if(player.submission.type === "image") { %>'+
        '<div><img src="<%= player.submission.url %>"></div>'+
      '<% } else { %>'+
        '<div><video src="<%= player.submission.url %>"></video></div>'+
      '<% } %>'+
    '<% } %>'+
  '<% }); %>'+
'');