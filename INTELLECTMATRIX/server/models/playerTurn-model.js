const mongoose = require('mongoose');

const playerTurnSchema = new mongoose.Schema({
  turn: Number,
});

module.exports = mongoose.model('PlayerTurn', playerTurnSchema);
