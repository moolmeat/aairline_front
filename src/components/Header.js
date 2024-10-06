import { useAuth } from '../context/AuthContext'; // AuthContext에서 상태 가져오기
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, handleLogout } = useAuth(); // 전역 로그인 상태 및 로그아웃 함수 사용
  const navigate = useNavigate();

  return (
    <header className="header">
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
