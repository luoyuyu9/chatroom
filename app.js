/*developed by Luo Yu
  4th 2014 
*/
var express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

io=require('socket.io').listen(server);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

var active=0;

io.on('connection',function(socket){
    var addedUser=false;
    active++;
    io.emit('message',{clients:active});

   socket.on('add user',function(username){
      socket.username=username;
      addedUser=true;
      io.emit('user joined',{
      username:socket.username
});
});
       socket.on('newchat',function(data){
      io.emit('newchat',{
      name:data.name,
      text:data.text,
});
});
      socket.on('disconnect',function(data){
    active--;
    if(addedUser){
    io.emit('user left',{
    username:socket.username
})
}
    io.emit('message',{clients:active});
});
});      
