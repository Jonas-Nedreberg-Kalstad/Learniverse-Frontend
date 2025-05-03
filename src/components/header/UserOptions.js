import React from 'react';
import '../../App.css';
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getIsAdmin, getIsProvider, getIsUser } from '../../utils/role';

function UserOptions() {

    const [showMenu, setShowMenu] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        const handleClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
    
        // Attach the event listener
        document.addEventListener('click', handleClick);
    
        // Cleanup the event listener on unmount
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, []);

    const removeJWT = () => {
        cookies.remove("JWT");
        window.location.href = "/";
    }

  return (
    <section ref={containerRef}>
        <img className='User-Icon' onClick={() => setShowMenu(!showMenu)} src={require("../../public/assets/images/user-icon.png")} alt='Open user menu'/>
        { showMenu  && (
            <nav className='User-Option-Container'>
                <p onClick={() => {navigate("/my-profile/general")}}>My Profile</p>
                <p onClick={() => {navigate("/my-profile/enrolled-courses")}}>Enrolled Courses</p>
                {(getIsAdmin() || getIsProvider()) && <p onClick={() => {navigate("/my-courses")}}>My Courses</p>}
                {getIsAdmin() && <p onClick={() => {navigate("/admin/users")}}>Admin Panel</p>}
                {getIsAdmin() && <p onClick={() => {window.open("http://localhost:8080/swagger-ui/index.html", "_blank")}}>Api Document</p>}
                <p onClick={() => removeJWT()}>Log Out</p>
            </nav>
        )}
    </section>
  );
}

export default UserOptions;