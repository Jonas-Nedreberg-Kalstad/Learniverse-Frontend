import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from './pages/Landing.js';
import CoursePage from './pages/Course.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Search from './pages/Search.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;