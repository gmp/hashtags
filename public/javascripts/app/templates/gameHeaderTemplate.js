ht.Templates.GameHeaderTemplate = _.template(''+
  '<div class="small-3 columns">'+
    '<img src="<%= judge.avatarURL %>">'+
  '</div>'+
  '<div class="small-9 columns">'+
    '<h4><%= prompt %></h4>'+
  '</div>'+
'');