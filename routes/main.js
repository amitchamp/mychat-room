var router = require('express').Router();
var passport = require('passport');
var FacebookStragey = require('passport-facebook').Stragey;
var PassportConfig = require('../config/passport');
var Secret = require('../config/secret');

router.get('/', function(req, res, next) {
	res.render('main/index', {
		msg: "working fine. This is a index page"
	})
});

router.get('/chatrooms', PassportConfig.isAuthenticated, function(req, res, next) {
	res.render('main/chatrooms', {
		user: req.user,
		host: Secret.host
	})
});

router.get('/room/:room_id', PassportConfig.isAuthenticated, function(req, res, next) {
	var allRooms = req.app.get('rooms');
	var room_name = findRoom(allRooms, req.params.room_id);

	res.render('main/room', {
		user: req.user,
		host: Secret.host,
		room_name: room_name,
		room_number: req.params.room_id
	});

});

function findRoom(allRooms, room_id) {
	var roomName = '';

	for (var i = 0; i < allRooms.length; i++) {
		if (allRooms[i].room_number == room_id) {
			roomName = allRooms[i].room_name;
			break;
		}
	};

	return roomName;
}

module.exports = router;