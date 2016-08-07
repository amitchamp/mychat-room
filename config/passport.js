var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var Secret = require('./secret');

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new FacebookStrategy({
	clientID: Secret.facebook.app_id,
	clientSecret: Secret.facebook.app_secret,
	callbackURL: Secret.facebook.callback_url,
	profileFields: ['id', 'displayName', 'photos']
}, function(accessToken, refreshToken, profile, done) {
		User.findOne({ profile_id: profile.id }, function(err, user) {
			if (err) { return done(err); }

			if (user) {
				done(null, user);
			} else {
				var newUser = User();
				newUser.profile_id = profile.id;
				newUser.full_name = profile.displayName;
				newUser.profile_pic = profile.photos[0].value || '';
				newUser.profile_pic = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';

				newUser.save(function(err) {
					done(null, newUser);
				});
			}
		});
}));

// Custom function to validate
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
