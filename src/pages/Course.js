import '../App.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import CourseMain from '../components/CourseMain.js';
import CourseDescription from '../components/CourseDescription.js';

function CoursePage() {
  return (
    <div className="App">
      <div>
        <Header />
        <CourseMain courseTitle={"The Art of Looking Busy While Doing Nothing"} />
      </div>
      <CourseDescription />
      <Footer />
    </div>
  );
}

export default CoursePage;