import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpContainer from '../components/Signup';

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