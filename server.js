var express = require('express');
var morgan = require('morgan');
var engine = require('hogan-express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;
var rooms = [];

// Import Settings
var Secret = require('./config/secret');

var app = express();
app.set('rooms', rooms);

// Database Connection
mongoose.connect(Secret.database, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connect to the database");
	}
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: Secret.secretKey,
	store: new MongoStore({ url: Secret.database, autoReconnect: true })
	//mongoose_connection: mongoose.connections[0]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
	res.locals.user = req.user;
	req.rooms;
	next();
});

app.engine('html', engine);
app.set('view engine', 'html');

// Routes
var mainRoute = require('./routes/main');
var userRoute = require('./routes/user');

app.use('/', mainRoute);
app.use('/', userRoute);


var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./socket/socket')(io, rooms);

server.listen(Secret.port, function() {
	console.log("Server is running at " + Secret.port + " port.");
});
