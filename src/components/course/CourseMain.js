import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Breadcrumps from './Breadcrumbs';
import Rating from '../common/rating/Rating';
import Tooltip from '../common/tooltip/Tooltip';
import { notify } from '../common/toaster/Toaster';
import enrollService from '../../service/enrollService';
import Cookies from 'universal-cookie';
import { getIsAdmin } from '../../utils/role';
import courseService from '../../service/courseService';

function CourseCard({ course }) {

  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(course ? course : null);
  const [isSaved, setIsSaved] = useState(false);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [image, setImage] = useState(require('../../public/assets/images/placeholder-image.png'));  

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return ""; // or return 0, or throw an error depending on your use case

    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
  };

  const handleResponse = (response) => {
    if(response.status == 200) {
      console.log(response.data);
      response.data.forEach(enrollment => {
        if(enrollment.course.id == course.id && enrollment.course.startDate === course.startDate) {
          setIsAlreadyEnrolled(true);
          return;
        }
      setIsAlreadyEnrolled(false)
      return;
      });
    }
  }

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses')) || [];
    if(course) {
      setIsSaved(savedCourses.some(c => c.id === course.id));
      setImage(course.courseImageUrl);
    }

    const cookies = new Cookies();
    const token = cookies.get("JWT");
    if(token && course) {
      enrollService.getEnrollments(handleResponse);
    }
  }, [course]);

  const saveCourseToLocalStorage = (course) => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses')) || [];
    const index = savedCourses.findIndex(c => c.id === course.id);
    if (index === -1) {
      // Not found, add it
      savedCourses.push(course);
      notify("SUCCESS", "Course added to watch list");
    } else {
      // Found, remove it
      savedCourses.splice(index, 1);
      notify("SUCCESS", "Course removed from watch list");
    }
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
    setIsSaved(index === -1); // Update state after toggling
  };

  // ...existing code...

  const toggleSave = () => {
    saveCourseToLocalStorage(course);
  }

  const handleDeleteResponse = (response) => {
    if(response.status == 200) {
      notify("SUCCESS", "Course has been deactivated");
      navigate('/');
    }
  }

  const disableCourse = () => {
    courseService.adminUpdateCourse(course.id, {...course, active:false}, handleDeleteResponse);
  }

  return (
    <main className="Course-Main-Container">
      <Breadcrumps category={course?.category?.category} courseName={course?.courseName} />
      
      <article className="Course-Main-Card-Container">
        <img style={{ aspectRatio:'3 / 2', objectFit:'cover', width:'100vw', maxWidth:'512px', maxHeight:'342px' }} src={image} alt="Course Image" />
  
        <section className="Course-Showcase-Container">
          <header className='Course-Showcase-Container-Header'>
            <h1 className='Text-Light-Title'>{course?.courseName} <img className='Icon-Large' style={{cursor:'pointer'}} onClick={() => toggleSave()} src={require(isSaved ? '../../public/assets/images/stored-icon.png' : '../../public/assets/images/not-stored-icon.png')} alt={isSaved ? 'Remove course from watch list' : 'Add course to watch list'}/></h1>
            <Rating rating={course?.averageRating} amount={course?.numberOfReviews} light={false} />
            <p>
              <span className='Text-Light'>Course by </span>
              <a className='Text-Light' href={course?.provider?.providerUrl}>{course?.provider?.providerName}</a>
            </p>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/difficulty-icon.png')} alt='Difficulty'/>
              <b className='Text-Light'>{course?.difficultyLevel?.type}</b>
              <Tooltip tooltip={"How difficult the course is estimated to be."} />
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/start-icon.png')} alt='Start'/>
              <b className='Text-Light'>Start: {formatDate(course?.startDate)}</b>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/end-icon.png')} alt='End'/>
              <b className='Text-Light'>End: {formatDate(course?.endDate)}</b>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/hour-icon.png')} alt='Hours per week'/>
              <b className='Text-Light'>{course?.hoursPerWeek?.hours} hours per week</b>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/graduation-icon.png')} alt='Credits'/>
              <b className='Text-Light'>{course?.credit?.credit} ECTS credits</b>
              <Tooltip tooltip={"ECTS is a standard for comparing academic workload and credit value across institutions."} />
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/duration-icon.png')} alt='Duration'/>
              <b className='Text-Light'>{getDuration(course?.startDate, course?.endDate)} days</b>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
              <img className='icon' src={require('../../public/assets/images/certificate-icon.png')} alt='Related certificate'/>
              <b className='Text-Light'>{course?.relatedCertificates[0]?.certificateName ? course?.relatedCertificates[0]?.certificateName : 'None'}</b>
              <Tooltip tooltip={"What certificate this course covers."} />
            </div>
            
          </header>

          <br/>
  
          <footer style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <p className='Text-Price light'>{course?.price} {course?.currency?.currency}</p>
            <button disabled={new Date() > new Date(course?.startDate) || isAlreadyEnrolled} className='button-enroll' onClick={() => { navigate(`enroll`) }}>{isAlreadyEnrolled ? 'Enrolled' : "Enroll"}</button>
          </footer>
        </section>
      </article>
      {getIsAdmin() && <div style={{width:'100%', maxWidth:'1024px'}}><button className='button-delete' onClick={() => disableCourse()}>Disable Course</button></div>}
    </main>
  );
}

export default CourseCard;