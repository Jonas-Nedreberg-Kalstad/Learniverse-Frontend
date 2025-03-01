import '../App.css';
import Header from '../components/header/Header.js';
import Footer from '../components/footer/Footer.js';
import CourseMain from '../components/course/CourseMain.js';
import CourseDescription from '../components/course/CourseDescription.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Get } from '../utils/fetch.js';

function CoursePage() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const handleResponse = (response) => {
    setCourseData(response.data);
  }

  useEffect(() => {
    Get(`api/anonymous/courses/${id}`, handleResponse);
  }, [])

  if(courseData == null) {
    return <text>Loading...</text>
  }

  return (
    <div className="App">
      <Header />
      <CourseMain id={id} title={courseData.courseName} creator={courseData.createdBy} price={courseData.price} currency={courseData.currency.currency} rating={courseData.averageRating} reviewAmount={courseData.numberOfReviews} />
      <CourseDescription description={courseData.description} category={courseData.category} topics={courseData.topics} />
      <Footer />
    </div>
  );
}

export default CoursePage;