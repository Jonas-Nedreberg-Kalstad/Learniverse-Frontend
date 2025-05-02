import './MyCourses.css';
import React, { useEffect, useState } from "react";
import ManageCourse from "./ManageCourse";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import courseApi from "../../service/courseService";
import MyCourseCard from "./MyCourseCard";
import MyCoursesFilter from "./MyCoursesFilter";
import courseService from "../../service/courseService";
import { OpenModal } from "../common/modal/Modal";
import ReOpenCourse from './ReOpenCourse';
import { notify } from "../common/toaster/Toaster";

const parentPath = "/my-courses";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [filterParameters, setFilterParameters] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleResponse = (response) => {
    console.log(response);
    if (response.status === 200) {
      setCourses(response.data);
    } else {
      console.error("Error fetching courses:", response.statusText);
    }
  }

  useEffect(() => {
    courseApi.getProviderCourses(handleResponse);
  }, []);

  useEffect(() => {
    if (!courses) return;

    const now = new Date();

    const sortedCourses = courses.filter((course) => {
      const startDate = new Date(course.startDate);
      const endDate = new Date(course.endDate);

      if (filterParameters.current) {
        return course.active && now >= startDate && now <= endDate; // Active courses
      }
      if (filterParameters.upcoming) {
        return course.active && now < startDate; // Upcoming courses
      }
      if (filterParameters.passed) {
        return course.active && now > endDate; // Past courses
      }
      if (filterParameters.deactivated) {
        return !course.active; // Deactivated courses
      }
      return true; // Default to showing all courses if no filter is selected
    });

    setFilteredCourses(sortedCourses);
  }, [courses, filterParameters]);

  const handleSubmit = () => {
    courseApi.getProviderCourses(handleResponse);
    notify("SUCCESS", "Course has been opened");
  }

  const onOpen = (course) => {
    OpenModal(<ReOpenCourse course={course} onSubmit={() => handleSubmit()} />)
  }

  const handleDeleteResponse = (response) => {
    if(response.status == 200) {
      courseApi.getProviderCourses(handleResponse);
      notify("SUCCESS", "Course has been deactivated");
    }
  }

  const handleDeactivate = (course) => {
    courseService.updateCourse(course.id, {...course, active:false}, handleDeleteResponse);
  }

  return (
    <div className="My-Course-Container">
      <MyCoursesFilter onFilterChange={setFilterParameters} />
      <div className="My-Course-Card-Container">
        <h3 onClick={() => navigate(`${parentPath}/general`)}>my-courses</h3>
        {filteredCourses.length > 0 ? filteredCourses?.map((course) => (
          <MyCourseCard course={course} key={course.id} onOpen={onOpen} onDeactivate={handleDeactivate} />
        )) : <span>No courses found</span>}
      </div>
      <Routes>
        <Route path={`${parentPath}/edit`} element={<ManageCourse course={null} />} />
        <Route path={`${parentPath}/create`} element={<ManageCourse />} />
      </Routes>
    </div>
  );
}

export default MyCourses;