const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  
  boardState: {
    type: Array,
    required: true,
  },
  currentPlayer: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
