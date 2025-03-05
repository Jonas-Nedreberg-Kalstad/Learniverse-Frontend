import '../../App.css';
import CourseMain from './CourseMain.js';
import CourseDescription from './CourseDescription.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fetch } from '../../service/apiService.js';
import courseService from '../../service/courseService.js';
import CourseReviews from './CourseReviews.js';

function Course() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const handleResponse = (response) => {
    setCourseData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    courseService.getCourse(id, handleResponse);
  }, [id])

  return (
    <div>
      <CourseMain course={courseData} />
      <CourseDescription course={courseData} />
      <CourseReviews course={courseData} />
    </div>
  );
}

export default Course;