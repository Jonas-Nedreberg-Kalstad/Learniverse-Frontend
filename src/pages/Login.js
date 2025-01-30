import '../App.css';
import Header from '../components/Header';
import LoginContainer from '../components/Login';
import Footer from '../components/Footer';

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