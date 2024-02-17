const PlayerTurn = require('../models/playerTurn-model');


exports.getPlayerTurn = async (req, res) => {
  try {
    const playerTurn = await PlayerTurn.findOne();
    res.json(playerTurn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updatePlayerTurn = async (req, res) => {
  try {
    const updatedTurn = await PlayerTurn.findOneAndUpdate({}, { $inc: { turn: 1 } }, { new: true });
    res.json(updatedTurn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
