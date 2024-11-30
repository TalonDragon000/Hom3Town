import { readFileSync } from "fs";
import io from 'socket.io-client';

const socket = io("http://localhost:3000", {// Connect to the server
    key: readFileSync("/path/to/client-key.pem"),
    cert: readFileSync("/path/to/client-cert.pem"),
    ca: [
      readFileSync("/path/to/server-cert.pem")
    ]
  });

socket.on('connect', () => {
    console.log('Connected to server');
});

// Additional socket event handling can go here

