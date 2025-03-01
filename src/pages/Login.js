import '../App.css';
import Header from '../components/header/Header';
import LoginContainer from '../components/login/Login';
import Footer from '../components/footer/Footer';

function Login() {
  return (
    <div className='App'>
        <Header />
        <LoginContainer />
        <Footer />
    </div>
  );
}

export default Login;