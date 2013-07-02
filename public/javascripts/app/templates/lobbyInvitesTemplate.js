ht.Templates.LobbyInvitesTemplate = _.template(''+
  '<% for(var i = 0; i < invites.length; i++) { %>'+
    '<div class="small-10 small-centered columns invite">'+
      '<p><b><%=invites[i].author %></b> has invited you to play!</p>'+
      '<div class="row">'+
        '<div class="small-6 columns">'+
          '<button class="accept small" data-invite-id="<%=invites[i].invite %>">Accept</button>'+
        '</div>'+
        '<div class="small-6 columns">'+
          '<button class="decline small" data-invite-id="<%=invites[i].invite %>">Decline</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '<% } %>'+
'');