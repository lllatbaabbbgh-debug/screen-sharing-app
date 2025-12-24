const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io Signaling Logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a specific room
    socket.on('join', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
        // Notify others in the room (optional, but good for debugging)
        socket.to(room).emit('user-joined', socket.id);
    });

    // Handle WebRTC Offer
    socket.on('offer', (data) => {
        // data should contain: { room: '...', offer: '...' }
        console.log(`Received offer from ${socket.id} for room ${data.room}`);
        // Broadcast to everyone else in the room
        socket.to(data.room).emit('offer', data.offer);
    });

    // Handle WebRTC Answer
    socket.on('answer', (data) => {
        // data should contain: { room: '...', answer: '...' }
        console.log(`Received answer from ${socket.id} for room ${data.room}`);
        // Broadcast to everyone else in the room (specifically the caller will pick it up)
        socket.to(data.room).emit('answer', data.answer);
    });

    // Handle ICE Candidates
    socket.on('candidate', (data) => {
        // data should contain: { room: '...', candidate: '...' }
        console.log(`Received candidate from ${socket.id} for room ${data.room}`);
        socket.to(data.room).emit('candidate', data.candidate);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`\nIMPORTANT: To test Screen Sharing, you usually need HTTPS or localhost.`);
    console.log(`Admin URL: http://localhost:${PORT}/admin.html`);
    console.log(`Client URL: http://localhost:${PORT}/index.html`);
});
