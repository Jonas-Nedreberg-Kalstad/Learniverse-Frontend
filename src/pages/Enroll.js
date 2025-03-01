import '../App.css';
import Header from '../components/header/Header';
import LoginContainer from '../components/login/Login';
import Footer from '../components/footer/Footer';
import Payment from '../components/enroll/Payment';

function Login() {
  return (
    <div className='App'>
        <Header />
        <Payment />
        <Footer />
    </div>
  );
}

export default Login;