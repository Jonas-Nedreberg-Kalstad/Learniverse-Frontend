import '../App.css';
import { useNavigate } from "react-router-dom";

function Header() {
  
  const navigate = useNavigate();

  return (
    <div className="Header-Container">
      <div>
        <a href='/'>Learniverse Connect</a>
        <input type="text" placeholder='search' onClick={() => navigate("/search")} />
      </div>
      <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </div>
    </div>
  );
}

export default Header;