var passport = require('passport'),
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
      
      // To keep the example simple, the user's Instagram profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Instagram account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

exports.init = function(app){
	app.use(passport.initialize());
  app.use(passport.session());
  return app;
}