const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controllers');


router.post('/create', async (req, res) => {
  const { username, roomID, socketID } = req.body;
  const result = await roomController.createRoom(username, roomID, socketID);
  res.json(result);
});

router.post('/join', async (req, res) => {
  const { username, roomID, socketID } = req.body;
  const result = await roomController.joinRoom(username, roomID, socketID);
  res.json(result);
});

module.exports = router;
