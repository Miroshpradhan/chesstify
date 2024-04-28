import React, { useState, useEffect } from 'react';
import UserPage from './components/UserPage';
import LoginForm from './components/loginForm';
import SignUpForm from './components/signupForm';
import "./styles/App.css";
import { useNavigate } from 'react-router-dom';
const MainPage = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [sparkles, setSparkles] = useState([]);
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    setIsLoggedIn(true);
    setLoginFormVisible(false);
    onLogin(); 
    navigate('/userpage');
  };

  const toggleFormVisibility = () => {
    setLoginFormVisible((prevVisibility) => !prevVisibility);
  };

  const createSparkle = (_, index) => {
    const color = "#ffffff";
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: color,
      animationDelay: `${Math.random() * 5}s`,
    };
  };

  useEffect(() => {
     
    const newSparkles = Array.from({ length: 200 }, createSparkle);
    setSparkles(newSparkles);

    const interval = setInterval(() => {
      const updatedSparkles = Array.from({ length: 200 }, createSparkle);
      setSparkles(updatedSparkles);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="maincontainer">
      {isLoggedIn ? (
        <UserPage />
      ) : (
                       
  <div className="Sparkle-container">
  {sparkles.map((sparkle, index) => (
  <div
    key={index}
    className="sparkle"
    style={{
      left: sparkle.left,
      top: sparkle.top,
      backgroundColor: sparkle.color,
      animationDelay: sparkle.animationDelay,
    }}
  />
))}
        <div className="App">
  
          <div className="mcontainer">
 
 
  <div className="logo">
    <img src="ChessLogo.png" alt="Chess Logo" />
    <h1 style={{ textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #000, 0 0 40px #000' }}>
      Chestify
    </h1>
  </div>
  <div className="statement">
    <p>"Play Chess for fun.Connect with people"</p>
  </div>
  <div className="container">
    {isLoginFormVisible && (
      <LoginForm onLogin={handleLogin} onSwitchForm={toggleFormVisibility} />
    )}
    {!isLoginFormVisible && <SignUpForm onSwitchForm={toggleFormVisibility} />}
  </div>
  
</div>
        </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
