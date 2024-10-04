import { signup } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {/* Use existing SignupForm */}
      <SignupForm onSignup={handleSignup} />
    </div>
  );
};

export default SignupPage;
