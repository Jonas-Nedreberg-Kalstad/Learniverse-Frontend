import '../App.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SignUp from '../components/signup/Signup';

function SignupPage() {
  return (
    <div className='App'>
      <Header />
      <SignUp />
      <Footer />
    </div>
  );
}

export default SignupPage;