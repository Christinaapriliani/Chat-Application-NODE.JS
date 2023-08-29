const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', socket => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
