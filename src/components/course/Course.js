import '../../App.css';
import CourseMain from './CourseMain.js';
import CourseDescription from './CourseDescription.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fetch } from '../../service/apiService.js';

function Course() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const handleResponse = (response) => {
    setCourseData(response.data);
  }

  useEffect(() => {
    Fetch("GET", `api/anonymous/courses/${id}`, null, handleResponse);
  }, [])

  if(courseData == null) {
    return <text>Loading...</text>
  }

  return (
    <div>
      <CourseMain id={id} title={courseData.courseName} creator={courseData.createdBy} price={courseData.price} currency={courseData.currency.currency} rating={courseData.averageRating} reviewAmount={courseData.numberOfReviews} />
      <CourseDescription description={courseData.description} category={courseData.category} topics={courseData.topics} />
    </div>
  );
}

export default Course;