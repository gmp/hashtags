<<<<<<< Updated upstream
exports.joinGame = function(socket, gameId){
  socket.join(gameId);
  socket.emit('joinedRoom', gameId);
}

exports.leaveGame = function(socket, roomId){
  console.log('left the game');
  socket.leave(roomId);
}
=======
exports.joinGame = function(socket, data){
  console.log(socket, data);
  socket.join(data);
};

exports.updateSubmittedProp = function(socket, gameId){
  console.log("updateSubmittedProp: ", socket, gameId);
};
>>>>>>> Stashed changes
