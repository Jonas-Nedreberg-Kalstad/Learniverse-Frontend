import '../App.css';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function Header() {
  
  const navigate = useNavigate();
  const cookies = new Cookies();  // Initialize Cookies instance
  const token = cookies.get("JWT");

  return (
    <div className="Header-Container">
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <a className='Logo-Text' onClick={() => {navigate("/")}}>Learniverse Connect</a>
        <SearchBar />
      </div>
      <div>
        { token ? (<img className='User-Icon' src={require("../assets/images/user-icon.png")} />) : 
        (<>
          <button onClick={() => navigate("/login")}>Login</button>
          <button className='Sign-Up-Button' onClick={() => navigate("/signup")}>Sign up</button>
        </>)
        }
        
      </div>
    </div>
  );
}

export default Header;