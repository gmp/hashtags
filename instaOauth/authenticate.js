var passport = require('passport'),
    User = require('../models/userModel.js'),
    InstagramStrategy = require('passport-instagram').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//LOCAL
passport.use(new InstagramStrategy({
    clientID: 'd37dfbd483674207b72a447e1b63b6bc',
    clientSecret: '5e0d4975780a4e36a59d78cb01c74868',
    callbackURL: "/auth/instagram/callback"
  },

  // //deploy*******
  // passport.use(new InstagramStrategy({
  //   clientID: '71b5042b9de24fe7816e9a44cd677912',
  //   clientSecret: '700d71898ce844fcace04ec958d19980',
  //   callbackURL: "/auth/instagram/callback"
  // },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var query = {'username': profile.username};
      console.log(profile);
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