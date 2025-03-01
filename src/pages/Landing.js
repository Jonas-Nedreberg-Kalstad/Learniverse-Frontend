import '../App.css';
import Header from '../components/header/Header.js';
import Hero from '../components/landing/Hero.js';
import CourseHierarchy from '../components/landing/CourseHierarchy.js';
import Footer from '../components/footer/Footer.js';
import TrendingTopics from '../components/landing/TrendingTopics.js';
import WantToTeach from '../components/landing/WantToTeach.js';

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