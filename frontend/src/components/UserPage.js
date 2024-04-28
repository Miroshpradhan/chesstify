import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import io from 'socket.io-client';
import ChatComponent from './ChatComponent';
import '../styles/App.css';
import ChessboardComponent from './Chessboards';
const socket = io();

const UserPage = () => {
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [playerColor, setPlayerColor] = useState('white');
  const [fen, setFen] = useState('start');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('gameStarted', (color) => {
      setIsGameInProgress(true);
      setPlayerColor(color);
    });

    socket.on('moveMade', (newFen) => {
      setFen(newFen);
    });

    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePlayNow = () => {
    if (!isGameInProgress) {
      socket.emit('joinGame');
    }
  };

  const handleMove = (move) => {
    socket.emit('makeMove', move);
  };

  const handleChatMessage = (message) => {
    socket.emit('chatMessage', message);
  };
   

  return (
    <div className="App-header">
      <h1>Chesstify</h1>
      {isGameInProgress ? (
        <>
          <Chessboard
            position={fen}
            onDrop={(move) => handleMove(move)}
            orientation={playerColor}
          />
          <ChatComponent messages={messages} onSendMessage={handleChatMessage} />
        </>
      ) : (
        <div>
        <ChessboardComponent  />
        <button onClick={handlePlayNow}>Play Now</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
