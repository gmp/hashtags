exports.joinGame = function(socket, data){
  console.log(socket, data);
  socket.join(data);
}