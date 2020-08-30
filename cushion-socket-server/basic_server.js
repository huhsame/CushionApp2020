var net = require('net');
var port = 11356;

var server = net.createServer(function(socket) {
  //console.log(socket.address().address + " connected.");

  socket.on('data', function(data) {
    console.log('from ' + socket.address().address + ':\n' + data);
    console.log('\n');
    //transfer data to mongoDB here
  });
  //socket.on('close', function(){
  //	console.log('client disconnected.');
  //});
  //socket.write('welcome to server');
});

server.maxConnections = 10;

server.on('error', function(err) {
  console.log('err' + err);
});

server.listen(port, function() {
  console.log('listening on ' + port);
});
