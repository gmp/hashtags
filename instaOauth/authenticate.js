var passport = require('passport'),
    User = require('../db/userModel.js'),
    InstagramStrategy = require('passport-instagram').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new InstagramStrategy({
    clientID: '5a8d22e45917474eba522ab5ed6b8141',
    clientSecret: '6eb265ab2ae649759d8bf62bb0620061',
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
          user.accessToken = accessToken;
          user.looking = false;
          user.avatarURL = profile._json.data.profile_picture;
          user.save(function(err){
            if(err) {
              console.log(err)
            }else{
              console.log("success");
            }
          });
        } else {
          user = obj;
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