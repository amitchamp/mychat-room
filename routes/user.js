var router = require('express').Router();
var passport = require('passport');
var FacebookStragey = require('passport-facebook').Stragey;
var passportConfig = require('../config/passport');
var User = require('../models/user');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/chatrooms',
	failureRedirect: '/'
}));

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;