import '../App.css';
import Header from '../components/Header';
import LoginContainer from '../components/Login';
import Footer from '../components/Footer';
import Payment from '../components/Payment';

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