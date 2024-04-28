import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';
import Chessboards from './Chessboards';
const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/mainpage'); 
  };

  return (
    <div >
        <div className='App-header'>
            <h1>Chesstify</h1>
         <Chessboards/></div>
    <div className='attractcard-container'>
      <div className='attractcard'>
        <div className='buttons'>
          <button className='gbutton'>Play as Guest</button>
          <button className='login' onClick={handleLogin}>Login</button>
        </div>
        <h3>Play and make some friends </h3>
      </div>
    </div></div>
  );
};

export default LoginButton;
