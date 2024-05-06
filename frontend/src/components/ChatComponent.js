import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import "../styles/ChatComponent.css";
const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false); // Track if users are playing chess
  const [isReady, setIsReady] = useState(false); // Track if the user is ready to play chess
  const [opponentReady, setOpponentReady] = useState(false); // Track if the opponent is ready
  const [matchmakingTimeout, setMatchmakingTimeout] = useState(null); // Timeout for matchmaking
 
  const chatRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      // Enable chat when connected
      setMessages([...messages, { text: 'Connected to chat.', sender: 'system' }]);
    });

    newSocket.on('disconnect', () => {
      // Disable chat when disconnected
      setMessages([...messages, { text: 'Disconnected from chat.', sender: 'system' }]);
    });

    newSocket.on('chatMessage', (message) => {
      setMessages([...messages, message]);
      // Scroll to the bottom of the chat when a new message is received
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });

    newSocket.on('playChess', () => {
      // Start playing chess when both players are ready
      setIsPlaying(true);
      clearTimeout(matchmakingTimeout);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (isReady && !matchmakingTimeout) {
      // Start matchmaking timeout when the user is ready
      const timeout = setTimeout(() => {
        setIsReady(false);
        socket.emit('cancelMatchmaking');
      }, 10000); // 10 seconds
      setMatchmakingTimeout(timeout);
      socket.emit('readyToPlay');
    }
  }, [isReady]);

  const sendMessage = () => {
    if (!socket || !inputValue.trim()) return;

    socket.emit('chatMessage', { text: inputValue, sender: 'user' });
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handlePlayNow = () => {
    if (!isReady) {
      setIsReady(true);
    }
  };

  return (
    <div className="chat-container">
      <div ref={chatRef} className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : message.sender === 'system' ? 'system-message' : 'opponent-message'}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
      </div>
      {!isPlaying && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
          <button onClick={handlePlayNow} disabled={isReady}>Play Now</button>
        </div>
      )}
      {isPlaying && <div className="game-container">Chess game goes here...</div>}
    </div>
  );
};

export default ChatComponent;
