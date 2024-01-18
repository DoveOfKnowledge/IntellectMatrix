const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomID: String,
  players: [{ username: String, socketID: String }],
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
