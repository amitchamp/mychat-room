# mychat-room
A simple chat demo using node-js and socket.io

## Installation

```
- Create database on mongolab or local and insert into config/secret.js in `database` key.
- Change port number (optionally)
- Change `secretKey`
- Create facebook app (https://developers.facebook.com/apps/) and copy `app_id` and `app_secret`
and paste into `app_id` and `app_secret` key respectively in config/secret.js.
- Change host (optionally)
```

## How to use

```
$ cd <projectName>
$ npm install
$ cd project/mychat-room
$ npm install
$ node server.js
```

And point your browser to `http://localhost:3000`.

## Features

Loggedin by facebook.
- Multiple users can join a chat room by each using facebook login.
- Users can type chat messages to the chat room.
- Users can create own rooms.
