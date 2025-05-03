import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Rating from "../common/rating/Rating";
import { useNavigate } from "react-router-dom";

function WatchList() {

    const navigate = useNavigate();
    const [savedCourses, setSavedCourses] = useState([]);

    useEffect(() => {
      const courses = JSON.parse(localStorage.getItem('savedCourses')) || [];
      setSavedCourses(courses);
      console.log(courses);
    }, []);

    const renderCourses = () => {
        return savedCourses.map((course, index) => (
            <div className="My-Profile-Card-Container" style={{ cursor:'pointer' }} onClick={() => navigate(`/course/${course.id}`)}>
              <img style={{aspectRatio:'3/2', maxWidth:'100%'}} src={course.courseImageUrl} alt='CourseImage'/>

              <div className='Course-Card-Info'>
                <text>{course.courseName}</text>
                <Rating rating={course.averageRating} amount={course.numberOfReviews} light={false} />
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                  <text>{course.provider.providerName}</text>
                  <b>{course.price} {course.currency.currency}</b>
                </div>
              </div>
            </div>
        ))
    }

return (
    <section style={{display:'flex', flexDirection:'column', gap:'16px'}}>
        <h2>Watch List</h2>
        {renderCourses()}
    </section>
  );
}

export default WatchList;