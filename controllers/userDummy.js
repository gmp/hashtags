//make the development db
var User = require('../models/userModel.js');

module.exports = function(){
  User.remove({}, function(){
    var user = new User();
    user.username = 'hifelight';
    user.looking = false;
    user.avatarURL = "http://images.ak.instagram.com/profiles/profile_175463296_75sq_1368998742.jpg"
    user.accessToken = "175463296.5a8d22e.6cb913cbe5114c13b2f3ebc1e5efcdf5"
    user._id = '51cc6e4854dd74c4c1000001';
    user.games = [];
    user.__v = 0;
    user.save(function(err){
      if(err) console.log(err); 
    });
    user = new User();
    user.username = 'ericrius1';
    user.looking = true;
    user.avatarURL = "http://images.ak.instagram.com/profiles/profile_178079200_75sq_1358784546.jpg"
    user.accessToken = "178079200.5a8d22e.749e4e2e281a48569f0ceb764e633bc5"
    user._id = '51cc70e677ee79fcc1000001';
    user.games = [];
    user.__v = 0;
    user.save(function(err){
      if(err) console.log(err); 
    });
    user = new User();
    user.username = 'banjolina_jolie';
    user.looking = true;
    user.avatarURL = "http://images.ak.instagram.com/profiles/profile_239326848_75sq_1350608830.jpg"
    user.accessToken = "239326848.5a8d22e.d3b499bcf9044621b0b6dd2f76d7c751"
    user._id = '51cc710577ee79fcc1000002';
    user.games = [];
    user.__v = 0;
    user.save(function(err){
      if(err) console.log(err); 
    });
    user = new User();
    user.username = 'gmp5';
    user.looking = true;
    user.avatarURL = "http://images.ak.instagram.com/profiles/profile_44947478_75sq_1363841652.jpg"
    user.accessToken = "44947478.5a8d22e.93234b311e9841a79b6edb2281c7adbe"
    user._id = '51cc74bbb298b522c2000001';
    user.games = [];
    user.__v = 0;
    user.save(function(err){
      if(err) console.log(err); 
    });
  });
}