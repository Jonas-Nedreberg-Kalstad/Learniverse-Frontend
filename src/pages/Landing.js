import '../App.css';
import Header from '../components/Header.js';
import Hero from '../components/Hero.js';
import CourseHierarchy from '../components/CourseHierarchy.js';
import Footer from '../components/Footer.js';
import TrendingTopics from '../components/TrendingTopics.js';
import WantToTeach from '../components/WantToTeach.js';

function LandingPage() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <CourseHierarchy />
      <TrendingTopics />
      <WantToTeach />
      <Footer />
    </div>
  );
}

export default LandingPage;