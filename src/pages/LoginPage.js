import '../App.css';
import Header from '../components/header/Header';
import Login from '../components/login/Login';
import Footer from '../components/footer/Footer';

function LoginPage() {
  return (
    <div className='App'>
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default LoginPage;