import React, { useState } from 'react';
import ChessboardComponent from './Chessboards';
import ChatComponent from './ChatComponent';
import '../styles/App.css';

const GuestPage = () => {
  const [skillLevel, setSkillLevel] = useState('');
  const [timeControl, setTimeControl] = useState('');

  const handleSkillLevelSelect = (level) => {
    setSkillLevel(level);
  };

  const handleTimeControlSelect = (control) => {
    setTimeControl(control);
  };

  const handlePlayNow = () => {
    
    console.log(`Starting game with skill level ${skillLevel} and time control ${timeControl}`);
  };

  return (
    <div className="App-header">
      <h1>Chesstify</h1>

      <div className="modal">
        <h2>Select Skill Level</h2>
        <button onClick={() => handleSkillLevelSelect('beginner')}>Beginner (Rating: 400)</button>
        <button onClick={() => handleSkillLevelSelect('intermediate')}>Intermediate (Rating: 1000)</button>
        <button onClick={() => handleSkillLevelSelect('advanced')}>Advanced (Rating: 1200)</button>
        <button onClick={() => handleSkillLevelSelect('expert')}>Expert (Rating: 2000)</button>
      </div>

      <div className="modal">
        <h2>Select Time Control</h2>
        <button onClick={() => handleTimeControlSelect('bullet')}>Bullet</button>
        <button onClick={() => handleTimeControlSelect('blitz')}>Blitz</button>
        <button onClick={() => handleTimeControlSelect('rapid')}>Rapid</button>
        <button onClick={() => handleTimeControlSelect('classical')}>Classical</button>
      </div>

      <button onClick={handlePlayNow}>Play Now</button>

      <ChessboardComponent />
      <ChatComponent />
    </div>
  );
};

export default GuestPage;
