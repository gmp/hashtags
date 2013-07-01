exports.joinGame = function(socket, data){
  console.log(socket, data);
  socket.join(data);
};

exports.updateSubmittedProp = function(socket, gameId){
  console.log("updateSubmittedProp: ", socket, gameId);
};