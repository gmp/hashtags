exports.joinGame = function(socket, gameId) {
  socket.join(gameId);
  socket.emit('joinedRoom', gameId);
};

exports.leaveGame = function(socket, roomId) {
  socket.leave(roomId);
};
