module.exports = function(io, rooms) {
	var allUsers = [];

	var chatrooms = io.of('/roomlist').on('connection', function(socket) {
		console.log("connection established on the server");
		socket.emit('roomupdate', JSON.stringify(rooms));

		socket.on('newroom', function(data) {
			rooms.push(data);
			socket.broadcast.emit('roomupdate', JSON.stringify(rooms));
			socket.emit('roomupdate', JSON.stringify(rooms));
		});

	});

	var messages = io.of('/messages').on('connection', function(socket) {
		console.log('connection established in messages page');

		socket.on('joinroom', function(data) {
			socket.username = data.user;
			socket.userPic = data.userPic;
			socket.join(data.room);

			allUsers.push({ id: socket.id, username: data.user, userPic: data.userPic, room: data.room });

			updateUserList(data.room, true);
		});

		socket.on('disconnect', function() {
			var room = ''
			for (var i = 0; i < allUsers.length; i++) {
				if (allUsers[i].id == socket.id) {
					room = allUsers[i].room;
					allUsers.splice(i, 1);
					break;
				}
			}

			updateUserList(room, true);
    });

		socket.on('newMessage', function(data) {
			socket.broadcast.to(data.roomNumber).emit('messageFeed', JSON.stringify(data));
		});

		function updateUserList(room, updateAll) {
			var roomuser = [];

			for (var i = 0; i < allUsers.length; i++) {
				if (allUsers[i].room == room) {
					roomuser.push({ userName: allUsers[i].username, userPic: allUsers[i].userPic });
				};
			};

			socket.to(room).emit('updateUserList', JSON.stringify(roomuser));

			if (updateAll) {
				socket.broadcast.to(room).emit('updateUserList', JSON.stringify(roomuser));
			}
		}

		socket.on('updateList', function(data) {
			updateUserList(data.room);
		});

	});
}
