import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io(); // Connect to the server

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect(); // Disconnect when component unmounts
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('chatMessage', input); // Send message to server
      setInput('');
    }
  };

  return (
    <div className="live-chat">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default LiveChat;
