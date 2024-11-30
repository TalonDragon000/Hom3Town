const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client/dist')));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
