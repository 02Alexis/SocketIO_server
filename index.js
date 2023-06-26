const path = require('path');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server =  app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('use:message', (data) => {
        io.sockets.emit('use:message', data);
    });

    socket.on('use:typing', (data) => {
        socket.broadcast.emit('use:typing', data);
    });
});