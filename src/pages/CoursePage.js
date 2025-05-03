import '../App.css';
import Header from '../components/header/Header.js';
import Footer from '../components/footer/Footer.js';
import Course from '../components/course/Course.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fetch } from '../service/apiService.js';

function CoursePage() {
  return (
      <Course />
  );
}

export default CoursePage;