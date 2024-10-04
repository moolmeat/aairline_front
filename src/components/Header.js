import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, refreshToken } from '../service/authService';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [timeLeft, setTimeLeft] = useState(1800);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      if (timeLeft <= 0) {
        alert("Session expired. Please log in again.");
        setIsLoggedIn(false);
        clearInterval(timer);
      }
    }

    return () => clearInterval(timer);
  }, [isLoggedIn, timeLeft]);

  const handleRefresh = async () => {
    try {
      const response = await refreshToken();
      setTimeLeft(1800);
      alert("Token refreshed successfully.");
    } catch (error) {
      console.error('Token refresh failed:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="header">
      {isLoggedIn ? (
        <div className="header__auth-info">
          <span className="header__time-left">
            남은 시간: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </span>
          <button className="header__button header__button--refresh" onClick={handleRefresh}>
            로그인 연장하기
          </button>
          <button className="header__button header__button--logout" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div className="header__menu">
          <Link className="header__link" to="/login">로그인</Link>
          <Link className="header__link" to="/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
