import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InterviewRoom from './components/InterviewRoom';
import RegistrationPage from './components/RegistrationPage';
import TestRoom from './components/TestRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/test" element={<TestRoom />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
