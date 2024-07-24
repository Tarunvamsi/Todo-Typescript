import React, { useRef } from 'react';

interface SignupProps {
  onSignup: (token: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      onSignup(data.token); 
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className='mt-32'>
      <form onSubmit={handleSignup}>
        <input ref={emailRef} type="email" placeholder="Email" required />
        <input ref={passwordRef} type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
