import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/Landing.js';
import Course from './pages/Course.js';
import Enroll from './pages/Enroll.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Search from './pages/Search.js';
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
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/course/:id/enroll" element={<Enroll />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;