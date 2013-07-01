ht.Templates.PlayerHashtagSelectTemplate = _.template(''+
  '<% for(var i = 0; i < hand.length; i++) { %>'+
    '<div class="row">'+
      '<div class="small-10 small-centered columns">'+
        '<button class="hashtag-button radius expand" data-hashtag="<%= hand[i] %>" ><%= hand[i] %></button></div>'+
      '</div>'+
    '</div>'+
  '<% } %>'+
'');