import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/main/Dashboard';
import AuthWrapper from './wrapper/AuthWrapper';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/" element={<AuthWrapper />}>
              <Route path="/" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
