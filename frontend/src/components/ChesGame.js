import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';

const ChessGame = () => {
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.fen());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (square) => {
    if (!selectedSquare) {
      setSelectedSquare(square);
      const moves = chess.moves({ square, verbose: true });
      const squares = moves.map((move) => move.to);
      setValidMoves(squares);
    } else {
      const move = chess.move({ from: selectedSquare, to: square });

      if (move) {
        setBoard(chess.fen());
      }

      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const squareStyles = ({ square }) => {
    if (validMoves.includes(square)) {
      return { backgroundColor: 'rgba(255, 255, 0, 0.4)' };
    }

    return {};
  };

  return (
    <div>
      <Chessboard
        position={board}
        onSquareClick={(square) => handleSquareClick(square)}
        squareStyles={squareStyles}
      />
    </div>
  );
};

export default ChessGame;
