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
          clients[data.user] = socket;
        });

        socket.on('joinGame', socketCont.joinGame(socket, data));

      });
};
