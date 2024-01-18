const Room = require("../models/room-model");

exports.createRoom = async (username, roomID, socketID) => {
  const existingRoom = await Room.findOne({ roomID });
  if (existingRoom) {
    return { success: false, message: 'Room already exists. Please choose a different room ID.' };
  }

  const room = new Room({
    roomID,
    players: [{ username, socketID }],
  });
  await room.save();

  return { success: true, roomID };
};

exports.joinRoom = async (username, roomID, socketID) => {
  const room = await Room.findOne({ roomID });

  if (room && room.players.length < 2) {
    if (room.players.find((player) => player.username === username)) {
      return { success: false, message: 'Username is already taken in this room. Please choose a different username.' };
    }

    room.players.push({ username, socketID });
    await room.save();

    return { success: true, roomID };
  }

  return { success: false, message: 'Room is full. Please try another room.' };
};
