import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { login } from './AuthService';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = await login(email, password);
      onLogin(token);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleLogin} />
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default Login;
