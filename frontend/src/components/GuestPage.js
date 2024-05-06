import React, { useState } from 'react';
import ChessboardComponent from './Chessboards';
import ChatComponent from './ChatComponent';
import '../styles/App.css';

const GuestPage = () => {
  const [skillLevel, setSkillLevel] = useState('');
  const [timeControl, setTimeControl] = useState('');
  const [showTimeControlModal, setShowTimeControlModal] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [guestName, setGuestName] = useState(generateGuestName());

  function generateGuestName() {
    const adjectives = ['Happy', 'Silly', 'Clever', 'Funny', 'Brave', 'Kind', 'Smart', 'Gentle', 'Witty', 'Lively'];
    const nouns = ['Penguin', 'Kitten', 'Puppy', 'Bunny', 'Tiger', 'Dolphin', 'Panda', 'Elephant', 'Lion', 'Koala'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  }
  const handleSkillLevelSelect = (level) => {
    setSkillLevel(level);
    setShowTimeControlModal(true);
  };

  const handleTimeControlSelect = (control) => {
    setTimeControl(control);
    setShowTimeControlModal(false);
  };

  const handlePlayNow = () => {
    setIsGameStarted(true);
    console.log(`Starting game with skill level ${skillLevel} and time control ${timeControl}`);
  };

  return (
    <div className="App-header">
      <h1>Chesstify</h1>

      {!isGameStarted && !showTimeControlModal && (
        <div className="modal">
          <h2>Select Skill Level</h2>
          <button onClick={() => handleSkillLevelSelect('beginner')}>Beginner (Rating: 400)</button>
          <button onClick={() => handleSkillLevelSelect('intermediate')}>Intermediate (Rating: 1000)</button>
          <button onClick={() => handleSkillLevelSelect('advanced')}>Advanced (Rating: 1200)</button>
          <button onClick={() => handleSkillLevelSelect('expert')}>Expert (Rating: 2000)</button>
        </div>
      )}

      {showTimeControlModal && (
        <div className="modal">
          <h2>Select Time Control</h2>
          <button onClick={() => handleTimeControlSelect('bullet')}>Bullet</button>
          <button onClick={() => handleTimeControlSelect('blitz')}>Blitz</button>
          <button onClick={() => handleTimeControlSelect('rapid')}>Rapid</button>
          <button onClick={() => handleTimeControlSelect('classical')}>Classical</button>
        </div>
      )}

      {skillLevel && timeControl && !isGameStarted && (
        <button onClick={handlePlayNow}>Play Now</button>
      )}

      <ChessboardComponent />
      <ChatComponent isChatEnabled={isGameStarted} />
    </div>
  );
};

export default GuestPage;
