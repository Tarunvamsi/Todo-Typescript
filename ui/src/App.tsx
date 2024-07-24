import './index.css';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/authContext'; // Adjust import path if necessary

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route
              path="/login"
              element={
                <LoginWrapper />
              }
            />
            <Route
              path="/signup"
              element={
                <SignupWrapper />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Body />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const LoginWrapper = () => {
  const { isLoggedIn, setToken } = useAuth();
  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token); // Update auth context
  };

  return isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />;
};

const SignupWrapper = () => {
  const { isLoggedIn, setToken } = useAuth();
  const handleSignup = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token); // Update auth context
  };

  return isLoggedIn ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
