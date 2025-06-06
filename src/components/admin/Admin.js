import React, { useState } from "react";
import '../../App.css';
import './Admin.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Providers from "./Providers";
import User from "./User";
import Users from "./Users";
import Provider from './Provider';

const parentPath = "/admin";

function Admin() {
    const navigate = useNavigate();

return (
    <main className="My-profile-container">
      <nav style={{width:'196px'}}>
        <h3 style={{cursor:'pointer'}} onClick={() => navigate(`${parentPath}/users`)}>Users</h3>
        <h3 style={{cursor:'pointer'}} onClick={() => navigate(`${parentPath}/providers`)}>Providers</h3>
      </nav>

      <Routes>
          <Route path="users" element={<Users />} />
          <Route path="user/:id" element={<User />} />
          <Route path="providers" element={<Providers />} />
          <Route path="provider/:id" element={<Provider />} />
      </Routes>
    </main>
  );
}

export default Admin;