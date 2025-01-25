import '../App.css';
import Breadcrumps from './Breadcrumbs';

function CourseCard({courseTitle, title, creator}) {
  return (
    <div className="Course-Main-Container">
      <div className="Course-Main-Top-Container">
        <Breadcrumps category={"Business"} courseName={"The Art of Looking Busy While Doing Nothing"} />
      </div>
      <div className="Course-Main-Card-Container">
        <div>
          <img style={{width:'576px', height:'384'}} src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'></img>
        </div>
        <div>
          <div className='Course-Showcase-Container'>
            <b>{courseTitle}</b>
            <p>Tired of working for money? Learn the ultimate skill of appearing productive while doing absolutely nothing. Discover clever techniques to trick colleagues, employers, and customers into believing you're hard at work—all while enjoying a stress-free day. Work smarter, not harder!</p>
            <text>Course by Valve Corporation</text>
            <b>2000 NOK</b>
            <button>Enroll</button>
          </div>
          <div className='Course-Meta-Container'>
            <text>Category</text>
            <button>Business</button>
            <text>Topics</text>
            <div>
              <button>Communication skills</button>
              <button>Time Management</button>
              <button>Networking & Relationship Management</button>
              <button>Meetings Management</button>
              <button>Leadership Presence</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;