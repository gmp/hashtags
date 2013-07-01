var socketio = require('socket.io'),
    io,
    socketCont = require('../controllers/socketController.js'), 
    clients = {};


exports.socketStart= function (server){
      io = socketio.listen(server);

      io.sockets.on('connection', function (socket) {
        socket.emit('giveClient');

        socket.on('setUpClients', function (data) {
          console.log(data);
          socket.userId = data.user;
          console.log(socket.userId);
          clients[socket.userId] = socket;
        });
        
        socket.on('disconnect', function (){
          console.log(socket.userId);
          delete clients[socket.userId];
        });

        socket.on('joinGame', function (data){
          socketCont.joinGame(socket, data);
        });

      });
};

exports.clients = clients;
