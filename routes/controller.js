var passport = require('passport');

module.exports = function (app) {
	// GET /auth/instagram
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Instagram authentication will involve
	//   redirecting the user to instagram.com.  After authorization, Instagram
	//   will redirect the user back to this application at /auth/instagram/callback
	app.get('/auth/instagram',
	  passport.authenticate('instagram'),
	  function(req, res){
	    // The request will be redirected to Instagram for authentication, so this
	    // function will not be called.
	 });

	// GET /auth/instagram/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/instagram/callback', 
	  passport.authenticate('instagram', { failureRedirect: '/#error' }),
	  function(req, res) {
	  	console.log(req.user.username);
	    res.redirect('/#lobby/'+req.user.username);
	  });

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
}