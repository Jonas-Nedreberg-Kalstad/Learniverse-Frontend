import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from './pages/LandingPage.js';
import CoursePage from './pages/CoursePage.js';
import EnrollPage from './pages/EnrollPage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import SearchPage from './pages/SearchPage.js';
import TosPage from './pages/TosPage.js';
import { setRolesFromJWT } from './utils/role.js';
import Cookies from 'universal-cookie';
import MyProfilePage from './pages/MyProfilePage.js';
import MyCoursesPage from './pages/MyCoursesPage.js';
import CreateCoursePage from './pages/CreateCoursePage.js';
import Toaster from './components/common/toaster/Toaster.js';
import AdminPage from './pages/AdminPage.js';
import Modal from './components/common/modal/Modal.js';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import ScrollToTop from './utils/ScrollToTop.js';
import AboutUsPage from './pages/AboutUsPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

function App() {

  document.title = "Learniverse Connect - Enroll Now!"

  const cookies = new Cookies();  // Initialize Cookies instance
  const token = cookies.get("JWT");
  setRolesFromJWT(token);

  return (
    <div className="App">

      <Modal />
      <Toaster />

      <Router>

        <ScrollToTop/>

        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/terms-of-service" element={<TosPage />} />
          <Route path="/my-profile/*" element={<MyProfilePage />} />
          <Route path="/my-courses/*" element={<MyCoursesPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/course/:id/enroll" element={<EnrollPage />} />
          <Route path="/create-course" element={<CreateCoursePage />} />
          <Route path="/create-course/:id" element={<CreateCoursePage />} />
          <Route path='/about-us' element={<AboutUsPage />}/>

          <Route path='/404' element={<NotFoundPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;