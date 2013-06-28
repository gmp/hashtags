var passport = require('passport'),
    user = require('../controllers/userController.js'),
    game = require('../controllers/gameController.js');

module.exports = function (app) {
  // GET /auth/instagram
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Instagram authentication will involve
  //   redirecting the user to instagram.com.  After authorization, Instagram
  //   will redirect the user back to this application at /auth/instagram/callback

  app.get('/users', user.findAll);
  app.get('/users/:username', user.findByUsername);
  app.get('/users/:id', user.findById);
  app.get('/games/:id', game.findById);

  app.get('/auth/instagram',
    passport.authenticate('instagram'),
    function(req, res){
      // function will not be called.
   }
  );

  app.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/#error' }),
    function(req, res) {
      console.log(req.user._id);
      res.redirect('/#lobby/'+req.user._id);
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};
