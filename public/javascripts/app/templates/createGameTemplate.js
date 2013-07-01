ht.Templates.CreateGameTemplate = _.template(''+
  '<div class="row">'+
    '<div class="small-3 columns">'+
      '<button id="cancel" class="small button">Cancel</button>'+
    '</div>'+
    '<div class="small-9 columns">'+
      '<h3>#CreateNewGame</h2>'+
    '</div>'+
  '</div>'+
  '<form>'+
    '<div class="row">'+
      '<div class="small-2 columns">'+
        '<label for="right-label" class="right inline">#Title</label>'+
      '</div>'+
      '<div class="small-10 columns">'+
        '<input type="text" id="right-label" placeholder="eg. Super Awesome Game Title">'+
      '</div>'+
    '</div>'+
  '</form>'+
  '<ul class="small-block-grid-2">'+
      '<li><img id="player1" class="avatar" src=" <%= avatarURL %> "></li>'+
      '<li><img id="player2" class="avatar avatar-contain" src="images/placeholder.jpg"></li>'+
      '<li><img id="player3" class="avatar avatar-contain" src="images/placeholder.jpg"></li>'+
      '<li><img id="player4" class="avatar avatar-contain" src="images/placeholder.jpg"></li>'+
  '</ul>'+
  '<div class="row">'+
    '<div id="startGameButton" class="small-6 small-centered columns">'+
      '<button id="start">Start The Game!</button>'+
    '</div>'+
  '</div>'+
'');