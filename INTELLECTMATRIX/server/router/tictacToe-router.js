const express = require('express');
const router = express.Router();
const ticTacToeController = require('../controllers/ticTacToe-controller');

router.get('/turn', ticTacToeController.getPlayerTurn);
router.post('/turn', ticTacToeController.updatePlayerTurn);

module.exports = router;
