const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); 

router.post('/move', async (req, res) => {
  const { move } = req.body;
  console.log(`Received move: ${move}`);

  try {
    let game = await Game.findOne();

    game.boardState = updateBoardState(game.boardState, move);
    game.currentPlayer = game.currentPlayer === 'white' ? 'black' : 'white';

    await game.save();

    res.status(200).json({ message: 'Move received and game state updated successfully' });
  } catch (err) {
    console.error('Error processing move:', err);
    res.status(500).json({ message: 'Failed to process move' });
  }
});

module.exports = router;

function updateBoardState(boardState, move) {
 
  return boardState;
}
