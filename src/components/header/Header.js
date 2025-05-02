import '../../App.css';
import './Header.css';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { getIsAdmin } from '../../utils/role';
import UserOptions from './UserOptions';
import LoginOptions from './LoginOptions';
import Hamburger from './Hamburger';

function Header() {
  
  const navigate = useNavigate();
  const cookies = new Cookies();  // Initialize Cookies instance
  const token = cookies.get("JWT");

  return (
    <header className="Header-Container">
      <Hamburger />
      <div className='Left-Container'>
        <div className='Header-Logo' onClick={() => {navigate("/")}}>
          <img className='Company-Logo' src={require('../../public/assets/images/LCLogo.png')} alt='Learniverse Connect company logo'/>
          <a className='Logo-Text'>Learniverse Connect</a>
        </div>
        <SearchBar />
      </div>
      { token ? (<UserOptions/>) : 
      (
      <>
      <LoginOptions />
      <div className='Authentication-Container'>
        <button className='button-secondary' onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </div>
      </>)
      }
        
    </header>
  );
}

export default Header;