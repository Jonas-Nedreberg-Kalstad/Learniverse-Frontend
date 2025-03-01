import React from 'react';
import '../../App.css';
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getIsAdmin, getIsProvider, getIsUser } from '../../utils/role';

function UserOptions() {

    const [showMenu, setShowMenu] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate;
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
    <div ref={containerRef}>
        <img className='User-Icon' onClick={() => setShowMenu(!showMenu)} src={require("../../assets/images/user-icon.png")} />
        { showMenu  && (
            <div className='User-Option-Container'>
                <p>My Profile</p>
                <p>Enrolled Courses</p>
                {(getIsAdmin() || getIsProvider()) && <p>My Courses</p>}
                {getIsAdmin() && <p>Admin Panel</p>}
                <p onClick={() => removeJWT()}>Log Out</p>
            </div>
        )}
    </div>
  );
}

export default UserOptions;