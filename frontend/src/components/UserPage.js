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
  const [isSearching, setIsSearching] = useState(false);
  const [time, setTime] = useState(30 * 60); // 30 minutes in seconds
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    socket.on('gameStarted', (color) => {
      setIsGameInProgress(true);
      setPlayerColor(color);
      startTimer();
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

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            // Game over due to timeout
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000) // Update every second
    );
  };

  const handlePlayNow = () => {
    if (!isGameInProgress && !isSearching) {
      setIsSearching(true);
      setTimeout(() => {
        if (!isGameInProgress && isSearching) {
          // Start the game with a bot if no player joined
          socket.emit('joinGame');
          setIsSearching(false);
        }
      }, 30000); // Wait for 30 seconds before starting
    }
  };

  const handleMove = (move) => {
    socket.emit('makeMove', move);
  };

  const handleChatMessage = (message) => {
    socket.emit('chatMessage', message);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
          <div>Time Remaining: {formatTime(time)}</div>
          <ChatComponent messages={messages} onSendMessage={handleChatMessage} />
        </>
      ) : (
        <div>
          <ChessboardComponent  />  
          <ChatComponent />
          {isSearching ? (
            <p>Searching for a match...</p>
          ) : (
            <button onClick={handlePlayNow}>Play Now</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
