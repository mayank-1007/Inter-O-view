import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InterviewRoom from './components/InterviewRoom';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/dashboard" element={<Dashboard name="abcd" overallScore={200} vacancy="xyz"/>} />
      </Routes>
    </Router>
  );
}

export default App;
