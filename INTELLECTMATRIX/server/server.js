require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const roomRoute = require("./router/room-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


//multiplayer

const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', async () => {
    console.log('User disconnected');
    // Handle disconnection, remove user from room, show alert, and redirect if needed
    const room = await Room.findOne({ 'players.socketID': socket.id });
    if (room) {
      room.players = room.players.filter((player) => player.socketID !== socket.id);
      await room.save();
      io.to(room.roomID).emit('playerLeft', socket.id);
      console.log("Player Disconnected");
    }
  });

  socket.on('createRoom', async ({ username, roomID }) => {
    // Assume that you have set up a POST API endpoint for creating a room
    const response = await fetch('http://localhost:5000/api/room/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, roomID, socketID: socket.id }),
    });
    const result = await response.json();

    if (result.success) {
      socket.join(roomID);
      socket.emit('roomCreated', roomID);
      console.log("room created successully");
      io.to(roomID).emit('playerJoined', { username, socketID: socket.id });
    } else {
      socket.emit('roomError', result.message);
    }
  });

  socket.on('joinRoom', async ({ username, roomID }) => {
    // Assume that you have set up a POST API endpoint for joining a room
    const response = await fetch('http://localhost:5000/api/room/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, roomID, socketID: socket.id }),
    });
    const result = await response.json();

    if (result.success) {
      socket.join(roomID);
      io.to(roomID).emit('playerJoined', { username, socketID: socket.id });
      socket.emit('roomJoined', roomID);
      console.log("room joined successully");
    } else {
      socket.emit('roomError', result.message);
    }
  });
});


/* handling cors policy issue */ 

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential: true,
};
 
app.use(cors(corsOptions));

/*
this line of code adds express middleware that parses incoming bodies with json payloads. 
it's important to place this before any routes that need to be handle json data in the request body.
*/
app.use(express.json());


//mount the touter: to use the router in main express app
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/room", roomRoute);


app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {

    server.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`);
    });
});
 
