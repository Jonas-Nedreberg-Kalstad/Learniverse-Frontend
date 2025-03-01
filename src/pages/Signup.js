import '../App.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SignUpContainer from '../components/signup/Signup';

function Signup() {
  return (
    <div className='App'>
        <Header />
        <SignUpContainer />
        <Footer />
    </div>
  );
}

export default Signup;