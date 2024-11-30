import io from 'socket.io-client';

// Use environment variable for the server URL
const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:3000"); // Connect to the server

socket.on('connect', () => {
    console.log('Connected to server');
});

// Additional socket event handling can go here

