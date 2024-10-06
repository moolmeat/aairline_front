import { createContext, useState, useContext, useEffect } from 'react';
import { login, refreshToken } from '../service/authService'; // authService 함수 가져오기

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.includes('JWT-TOKEN'));

  const handleLogin = async (loginData) => {
    const response = await login(loginData);
    setIsLoggedIn(true); // 로그인 상태 업데이트
  };

  const handleLogout = () => {
    document.cookie = 'JWT-TOKEN=; Max-Age=0; path=/;';
    setIsLoggedIn(false); // 로그아웃 시 상태 업데이트
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.cookie.includes('JWT-TOKEN')) {
        refreshToken();
      }
    }, 60000); // 60초마다 토큰 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext에서 상태와 함수 가져오기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
