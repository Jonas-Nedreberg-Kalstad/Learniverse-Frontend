import React from 'react';
import '../../App.css';
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getIsAdmin, getIsProvider, getIsUser } from '../../utils/role';

function LoginOptions() {

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

  return (
    <section className='Login-Options-Container' ref={containerRef}>
        <img className='User-Icon' onClick={() => setShowMenu(!showMenu)} src={require("../../public/assets/images/key-icon.png")} alt='Open login menu' />
        { showMenu  && (
            <nav className='User-Option-Container'>
                <p onClick={() => navigate("/login")}>Login</p>
                <p onClick={() => navigate("/signup")}>Sign up</p>
            </nav>
        )}
    </section>
  );
}

export default LoginOptions;