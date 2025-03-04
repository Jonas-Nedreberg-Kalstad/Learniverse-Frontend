import '../App.css';
import Header from '../components/header/Header.js';
import Footer from '../components/footer/Footer.js';
import Landing from '../components/landing/Landing.js';

function LandingPage() {
  return (
    <div className="App">
      <Header />
      <Landing />
      <Footer />
    </div>
  );
}

export default LandingPage;