import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { signup } from './AuthService';

interface SignupProps {
  onSignup: (token: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (email: string, password: string, username?: string) => {
    try {
      if (username) {
        const token = await signup(email, password, username);
        onSignup(token);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleSignup} isSignup />
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default Signup;
