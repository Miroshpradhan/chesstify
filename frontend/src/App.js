import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginButton from './components/loginbutton';
import MainPage from './mainPage'; 
import './styles/App.css'; 
import UserPage from './components/UserPage';
import GuestPage from './components/GuestPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
  
        <Routes>
        <Route path="/" element={<LoginButton />}  />
          <Route path="/mainpage" element={<MainPage onLogin={handleLogin}/>} />
    <Route path="/userpage" element={<UserPage/>}/> 
    <Route path="/guestpage" element={<GuestPage/>}/>
        </Routes>
      
    </Router>
  );
};

export default App;
