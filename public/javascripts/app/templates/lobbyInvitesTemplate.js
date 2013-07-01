ht.Templates.LobbyInvitesTemplate = _.template(''+
  '<% for(var i = 0; i < invites.length; i++) { %>'+
    '<div class="small-8 small-centered columns invite">'+
      '<p><%=invites[i].author %> has invited you to play!</p>'+
      '<div class="row">'+
        '<div class="small-6 columns>'+
          '<button class="accept" data-invite-id="<%=invites[i].invite %>" class="small">Accept</button>'+
        '</div>'+
        '<div class="small-6 columns>'+
          '<button class="decline" data-invite-id="<%=invites[i].invite %>" class="small">Decline</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '<% } %>'+
'');