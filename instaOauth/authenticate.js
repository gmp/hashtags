var passport = require('passport'),
    User = require('../db/UserModel.js'),
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
    callbackURL: "http://localhost:3000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    console.log('login', profile);
    process.nextTick(function () {
      var query = {'username': profile.username};
      User.findOne(query, function(err, obj){
        var user;
        if(!obj){
          user = new User();
          user.username = profile.username;
          user.accessToken = accessToken;
          user.looking = false;
          user.avatarURL = profile._json.data.profile_picture;
          user.save(function(err){
            if(err) console.log(err); 
          });
        } else {
          user = obj;
        }
        console.log(user);
      });
      return done (null, profile);
    });
  }
));

exports.init = function(app){
	app.use(passport.initialize());
  app.use(passport.session());
  return app;
}