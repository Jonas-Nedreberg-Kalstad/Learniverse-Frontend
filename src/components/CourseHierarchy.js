import '../App.css';
import CourseCard from './CourseCard';

function CourseHierarchy({imgLink, title, creator}) {
  return (
    <div className="Course-Hierarchy-Container">
        <h2>Top rated courses</h2>
      <div className="Course-Container">
        <CourseCard imgLink='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp' title="How to Win Every Argument (Even When You're Wrong)" creator='WJC'/>
        <CourseCard imgLink='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp' title='JavaScript for People Who Hate JavaScript'          creator='NTNU'/>
        <CourseCard imgLink='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp' title='Azure certification'                                creator='Microsoft, Azure'/>
        <CourseCard imgLink='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp' title='The Art of Looking Busy While Doing Nothing'        creator='Valve Corporation'/>
        <CourseCard imgLink='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp' title='Get Rich Quick (Or at Least Look Like You Are)'     creator='Finance bros'/>
      </div>
    </div>
  );
}

export default CourseHierarchy;