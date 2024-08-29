import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InterviewRoom from './components/InterviewRoom';
import RegistrationPage from './components/RegistrationPage';
import TestRoom from './components/TestRoom';
import AnimatedCircle from './components/AnimatedCircle';

function App() {
  const colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00f'];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/test" element={<TestRoom />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/circle" element={<AnimatedCircle colors={colors} />} />
      </Routes>
    </Router>
  );
}

export default App;
