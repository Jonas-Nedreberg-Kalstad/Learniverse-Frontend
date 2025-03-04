import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from './pages/LandingPage.js';
import CoursePage from './pages/CoursePage.js';
import EnrollPage from './pages/EnrollPage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import SearchPage from './pages/SearchPage.js';
import { setRolesFromJWT } from './utils/role.js';
import Cookies from 'universal-cookie';

function App() {

  document.title = "Learniverse Connect - Enroll Now!"

  const cookies = new Cookies();  // Initialize Cookies instance
  const token = cookies.get("JWT");
  setRolesFromJWT(token);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/course/:id/enroll" element={<EnrollPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;