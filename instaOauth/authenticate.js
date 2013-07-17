var passport = require('passport'),
    User = require('../models/userModel.js'),
    InstagramStrategy = require('passport-instagram').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: "/auth/instagram/callback"
  },

  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var query = {'username': profile.username};
      var user;
      User.findOne(query, function(err, obj){
        if(!obj){
          user = new User();
          user.username = profile.username;
          user.name = profile.name;
          user.accessToken = accessToken;
          user.looking = false;
          user.avatarURL = profile._json.data.profile_picture;
          user.save(function(err){
            if(err) {
              console.log(err);
            }else{
              console.log("success");
            }
          });
        } else {
          user = obj;
          user.accessToken = accessToken;
          user.avatarURL = profile._json.data.profile_picture;
          user.save(function(err){
            if(err) {
              console.log(err);
            } else {
              console.log('success');
            }
          });
        }
        return done (null, user);
      });
    });
  }
));

exports.init = function(app){
	app.use(passport.initialize());
  app.use(passport.session());
  return app;
}
