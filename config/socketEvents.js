var socketio = require('socket.io'),
    io,
    socketCont = require('../controllers/socketController.js'),
    clients = {};


exports.socketStart= function (server){
      io = socketio.listen(server);

      io.sockets.on('connection', function (socket) {

        socket.on('gotUserId', function(data) {
          socket.userId = data.user;
          clients[socket.userId] = socket;
        });

        socket.on('disconnect', function (){
          console.log(socket.userId);
          delete clients[socket.userId];
        });

        socket.on('joinGame', function (gameId){
          socketCont.joinGame(socket, gameId);
        });

        socket.on('leaveGame', function (roomId){
          socketCont.leaveGame(socket, roomId);
        });

      });

      exports.io = io;
};

exports.clients = clients;
