import '../App.css';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { getIsAdmin } from '../utils/role';
import UserOptions from './UserOptions';

function Header() {
  
  const navigate = useNavigate();
  const cookies = new Cookies();  // Initialize Cookies instance
  const token = cookies.get("JWT");

  console.log(getIsAdmin());

  return (
    <header className="Header-Container">
      <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'16px' }}>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', cursor:'pointer' }} onClick={() => {navigate("/")}}>
          <img style={{height:'48px'}} src={require('../assets/images/LCLogo.png')}/>
          <a className='Logo-Text'>Learniverse Connect</a>
        </div>
        <SearchBar />
      </div>
      <div>
        { token ? (<UserOptions/>) : 
        (<>
          <button className='Button-Header' onClick={() => navigate("/login")}>Login</button>
          <button className='Sign-Up-Button' onClick={() => navigate("/signup")}>Sign up</button>
        </>)
        }
        
      </div>
    </header>
  );
}

export default Header;