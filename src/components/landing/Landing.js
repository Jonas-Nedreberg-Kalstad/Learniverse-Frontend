import '../../App.css';
import './Landing.css';
import Hero from './Hero.js';
import CourseHierarchy from './CourseHierarchy.js';
import TrendingTopics from './TrendingTopics.js';
import WantToTeach from './WantToTeach.js';

function Landing() {
  return (
    <div className='Landing-container'>
      <Hero />
      <CourseHierarchy />
      <TrendingTopics />
      <WantToTeach />
    </div>
  );
}

export default Landing;