import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { OpenModal } from '../common/modal/Modal';
import DeleteCourse from './DeleteCourse';
import ReOpenCourse from './ReOpenCourse';
import courseService from '../../service/courseService';
import { notify } from '../common/toaster/Toaster';

function MyCourseCard({ course, onOpen, onDeactivate }) {

  const [active, setActive] = useState(course.active);

  const navigate = useNavigate();

  useEffect(() => {
    setActive(course.active);
  }, [course]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const passedDate = () => {
    const now = new Date();
    const endDate = new Date(course.endDate);
    return now > endDate;
  }

  const getStatus = () => {
    const now = new Date();
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate);

    if(course.active && now < startDate) {
      return "Up-Coming Course";
    }

    if(course.active && startDate < now && now < endDate) {
      return "Started";
    }

    if(course.active && endDate < now) {
      return "Passed Course";
    }

    return "Disabled Course";
  }

  const getDate = () => {
    const now = new Date();
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate);

    if(course.active && now < startDate) {
      return `Start Date: ${formatDate(course.startDate)}`;
    }

    if(course.active && startDate < now && now < endDate) {
      return `End Date: ${formatDate(course.startDate)}`;
    }

    if(course.active && startDate < now) {
      return `Ended: ${formatDate(course.endDate)}`;
    }

    if(course.active && startDate < now) {
      return `End Date: ${formatDate(course.endDate)}`;
    }

    return "";
  }

  return (
    <div className="My-Courses-Card-Container">

      <img src={course?.courseImageUrl} alt='CourseImage'/>
        
        <div style={{display:'flex', flexDirection:'row', flexGrow:'1'}}>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', margin:'4px', gap:'8px', maxWidth:'256px'}}>
            <label>{course.courseName}</label>
            <label>{getStatus()}</label>
            <label>{getDate()}</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><img className='star-icon' src={require(active ? '../../public/assets/images/green-icon.png' : '../../public/assets/images/red-icon.png')}/>{active ? "Active" : "Deactivated"}</label>
          </div>
        </div>

        <div style ={{display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'8px', margin:'4px'}}>
          {(!active || passedDate()) && <button name='reopen' onClick={() => onOpen(course)}>Open</button>}
          {(active) && <button name='reopen' onClick={() => onDeactivate(course)}>Deactivate</button>}
          <button name='edit' onClick={() => navigate(`/create-course/${course.id}`, { state: { course } })}>Edit</button>
        </div>
    </div>
  );
}

export default MyCourseCard;