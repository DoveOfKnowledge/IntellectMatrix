require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//multiplayer 

const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


const Room = mongoose.model('Room', {
  roomID: String,
  players: [{ username: String, socketID: String }],
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Handle disconnection, remove user from room, show alert, and redirect if needed
  });

  socket.on('createRoom', async ({ username, roomID }) => {
    const room = new Room({
      roomID,
      players: [{ username, socketID: socket.id }],
    });
    await room.save();
    socket.join(roomID);
    socket.emit('roomCreated', roomID);
  });

  socket.on('joinRoom', async ({ username, roomID }) => {
    const room = await Room.findOne({ roomID });

    if (room && room.players.length < 2) {
      room.players.push({ username, socketID: socket.id });
      await room.save();
      socket.join(roomID);
      io.to(roomID).emit('roomJoined', roomID);
    } else {
      socket.emit('roomFull', roomID);
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

app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {

    server.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`);
    });
});
 