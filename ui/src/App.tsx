import "./index.css";
import "./App.css";
import Project from "./Pages/Project";
import Header from "./components/Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/authContext";
import Dashboard from "./Pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gradient-to-r from-stone-900 to-sky-800 min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/login" element={<LoginWrapper />} />
            <Route path="/signup" element={<SignupWrapper />} />
            <Route path="/projects" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/projects/:projectId" element={<ProtectedRoute><Project /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/projects" />} />
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

const LoginWrapper = () => {
  const { isLoggedIn, setToken } = useAuth();
  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token); // Update auth context
  };

  return isLoggedIn ? (
    <Navigate to="/projects" />
  ) : (
    <Login onLogin={handleLogin} />
  );
};

const SignupWrapper = () => {
  const { isLoggedIn, setToken } = useAuth();
  const handleSignup = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token); // Update auth context
  };

  return isLoggedIn ? (
    <Navigate to="/projects" />
  ) : (
    <Signup onSignup={handleSignup} />
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
