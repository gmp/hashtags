ht.Templates.GameHashtagSelectTemplate = _.template(''+
  '<% for(var i = 0; i < hand.length; i++) { %>'+
      '<div><button class="hashtag" data-hashtag="<%= hand[i] %>" ><%= hand[i] %></button></div>'+
  '<% } %>'+
'');