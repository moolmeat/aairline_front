import { login, saveToken } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (loginData) => {
    try {
      const response = await login(loginData);
      saveToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {/* Use existing LoginForm */}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
