var socketio = require('socket.io'),
        io, clients = {};


exports.socketStart= function (server){
      io = socketio.listen(server);

      io.sockets.on('connection', function (socket) {

        socket.emit('message', { hello: 'world' });

        socket.on('event', function (data) {
          console.log(data);
        });

      

      });

};
