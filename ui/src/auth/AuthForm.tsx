import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  onSubmit: (email: string, password: string, username?: string) => void;
  isSignup?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isSignup }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const username = isSignup ? usernameRef.current?.value.trim() : undefined;

    if (!email || !password || (isSignup && !username)) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError(null);
    onSubmit(email, password, username);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-48 bg-white rounded-lg shadow-red-500 shadow-md">
      <h2 className='font-bold ml-28 mb-3 text-blue-500 text-2xl hover:text-red-600 animate-bounce animate-thrice'>Welcome User!</h2>
      {isSignup && (
        <div className="mb-4">
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      )}
      <div className="mb-4">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="mb-6">
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition duration-300"
      >
        {isSignup ? 'Signup' : 'Login'}
      </button>
      {isSignup ? <Link to='/login'><p className='m-4 hover:text-green-600'>Already user? Login</p></Link> : <Link to='/signup'><p className='m-4 hover:text-green-700'> New User? Signup</p></Link>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </form>
  );
};

export default AuthForm;
