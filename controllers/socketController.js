exports.joinGame = function(socket, gameId){
  socket.join(gameId);
  socket.emit('joinedRoom', gameId);
};

exports.leaveGame = function(socket, roomId){
  socket.leave(roomId);
};

exports.updateSubmittedProp = function(socket, gameId){
  console.log("updateSubmittedProp: ", socket, gameId);
};
