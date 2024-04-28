import React from 'react';
import Chessboard from 'chessboardjsx';
import '../styles/chessboard.css';

    const ChessboardComponent = () => (
        <div className="chessboard">
          <Chessboard 
            squareStyles={{
              dark: { backgroundColor: '#769656' },
              light: { backgroundColor: '#eeeed2' },
            }}
            dropSquareStyle={{ boxShadow: 'inset 0 0 1px 4px rgb(255 255 0 / 50%)' }}
            width={400}
            position="start"
            orientation="white"
          />
        </div>
      );
      


export default ChessboardComponent;
