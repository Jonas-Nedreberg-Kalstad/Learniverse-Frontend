import React, { useEffect, useState } from "react";
import enrollService from "../../service/enrollService";
import SearchResultCard from "../search/SearchResultCard";
import EnrolledCoursesCard from "./EnrolledCoursesCard";


function EnrolledCourses() {

  const [upcomingEnrollments, setUpcomingEnrollments] = useState([]);
  const [currentEnrollments, setCurrentEnrollments] = useState([]);
  const [pastEnrollments, setPastEnrollments] = useState([]);

  const handleResponse = (response) => {
    if(response.status == 200) {
      sortEnrollments(response.data);
    } else {
      alert("something went wrong!");
    }
  }

  const sortEnrollments = (data) => {
    const today = new Date();

    // Clear the current lists before sorting
    setUpcomingEnrollments([]);
    setCurrentEnrollments([]);
    setPastEnrollments([]);

    data.forEach(enrollment => {
      const startDate = new Date(enrollment.startDate);
      const endDate = new Date(enrollment.endDate);

      // Check if the current date is within the enrollment period (current enrollments)
      if (today >= startDate && today <= endDate) {
        setCurrentEnrollments(prev => [...prev, enrollment]);
      }
      // Check if the current date is before the start date (upcoming enrollments)
      else if (today < startDate) {
        setUpcomingEnrollments(prev => [...prev, enrollment]);
      }
      // Check if the current date is after the end date (past enrollments)
      else if (today > endDate) {
        setPastEnrollments(prev => [...prev, enrollment]);
      }
    });
  }

  useEffect(() => {
    enrollService.getEnrollments(handleResponse);
  }, [])

return (
  <section className="Enrolled-Courses-container">
    <h2>Current Enrollments</h2>
    <h3>Currently Active</h3>
    {currentEnrollments.length > 0 ? (
      currentEnrollments.map((enroll) => (
        <EnrolledCoursesCard key={enroll.id} course={enroll.course} />
      ))
    ) : (
      <p>No Active Courses</p> // Display this message if there are no active courses
    )}

    <h3>Upcoming Courses</h3>
    {upcomingEnrollments.length > 0 ? (
      upcomingEnrollments.map((enroll) => (
        <EnrolledCoursesCard key={enroll.id} course={enroll.course} />
      ))
    ) : (
      <p>No Upcoming Courses</p> // Display this message if there are no upcoming courses
    )}

    <h3>Past Courses</h3>
    {pastEnrollments.length > 0 ? (
      pastEnrollments.map((enroll) => (
        <EnrolledCoursesCard key={enroll.id} course={enroll.course} />
      ))
    ) : (
      <p>No Past Courses</p> // Display this message if there are no past courses
    )}
  </section>
);
}

export default EnrolledCourses;