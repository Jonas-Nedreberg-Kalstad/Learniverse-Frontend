import '../../App.css';
import CourseCard from './CourseCard';
import { useNavigate } from "react-router-dom";
import { Fetch } from '../../service/apiService';
import { URL } from '../../utils/url';
import { useEffect, useState } from 'react';
import courseService from '../../service/courseService';

function CourseHierarchy() {

  const [listOfCourses, setListOfCourses] = useState(null);
  const [hasRecievedResponse, setHasRecievedResponse] = useState(false);
  
  const navigate = useNavigate(URL.BACKEND, "api/");

  const handleResponse = (response) => {
    setListOfCourses(response.data);
  } 

  useEffect(() => {
    courseService.mostPopularCourses(handleResponse);
  }, [])

  useEffect(() => {
    setHasRecievedResponse(true);
  }, [listOfCourses])

  const createCourseCards = () => {
    return(
      listOfCourses?.map((course, index) => (
        <CourseCard
          id={course.id} // Ideally, use course.id if available
          imgLink={course.courseImageUrl}
          title={course.courseName}
          creator={course.provider.providerName}
          rating={course.averageRating}
          amount={course.numberOfReviews}
          price={course.price}
        />
      ))
    )
  }

  return (
    <div className="Course-Hierarchy-Container">
      <h2>Top rated courses</h2>
      <div className='Course-Container'>
        {hasRecievedResponse && createCourseCards()}
      </div>
      <a href='' onClick={() => navigate("/search")}>Explore all our courses</a>
    </div>
  );
}

export default CourseHierarchy;