import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext에서 상태 가져오기
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { handleLogin } = useAuth(); // 로그인 함수 사용
  const navigate = useNavigate();

  const onLogin = async (loginData) => {
    try {
      await handleLogin(loginData);
      navigate('/'); // 로그인 성공 후 리다이렉트
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
