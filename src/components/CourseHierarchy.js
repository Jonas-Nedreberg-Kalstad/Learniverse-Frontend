import '../App.css';
import CourseCard from './CourseCard';
import { useNavigate } from "react-router-dom";
import { Get } from '../utils/fetch';
import { URL } from '../utils/url';
import { useEffect, useState } from 'react';

function CourseHierarchy({imgLink, title, creator}) {

  const [listOfCourses, setListOfCourses] = useState([]);
  const [hasRecievedResponse, setHasRecievedResponse] = useState(false);
  
  const navigate = useNavigate(URL.BACKEND, "api/");

  useEffect(() => {

    const fetchData = async () => {
      let responseData = await Get("api/anonymous/mostPopularCourses?page:0&size:5");
      setListOfCourses(responseData);
    }

    fetchData();
  }, [])

  useEffect(() => {
    setHasRecievedResponse(true);
    console.log(listOfCourses);
  }, [listOfCourses])

  const createCourseCards = () => {
    return(
      listOfCourses.map((course, index) => (
        <CourseCard
          id={course.id} // Ideally, use course.id if available
          imgLink="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
          title={course.courseName}
          creator="WJC"
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
      <a href='' onClick={() => navigate("/search")}>View all popular courses</a>
    </div>
  );
}

export default CourseHierarchy;