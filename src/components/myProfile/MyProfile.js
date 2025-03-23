import React, { useState } from "react";
import General from "./General";
import EnrolledCourses from "./EnrolledCourses";
import TransactionHistory from "./TransactionHistory";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WatchList from "./WatchList";

const parentPath = "/my-profile";

function MyProfile() {
    const navigate = useNavigate();

return (
    <div className="My-profile-container">
      <nav>
        <h3 style={{cursor:'pointer'}} onClick={() => navigate(`${parentPath}/general`)}>General</h3>
        <h3 style={{cursor:'pointer'}} onClick={() => navigate(`${parentPath}/enrolled-courses`)}>Enrolled Courses</h3>
        <h3 style={{cursor:'pointer'}} onClick={() => navigate(`${parentPath}/transactions`)}>Transaction History</h3>
        <h3 style={{cursor:'pointer'}} onClick={() => navigate(`${parentPath}/watch-list`)}>Watch List</h3>
      </nav>
        <Routes>
          <Route path="general" element={<General />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="watch-list" element={<WatchList />} />
        </Routes>
    </div>
  );
}

export default MyProfile;