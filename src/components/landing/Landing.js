import '../../App.css';
import './Landing.css';
import Hero from './Hero.js';
import CourseHierarchy from './CourseHierarchy.js';
import TrendingTopics from './TrendingTopics.js';
import WantToTeach from './WantToTeach.js';

function Landing() {
  return (
    <main className='Landing-container'>
      <Hero />
      <CourseHierarchy />
      <TrendingTopics />
      <WantToTeach />
    </main>
  );
}

export default Landing;