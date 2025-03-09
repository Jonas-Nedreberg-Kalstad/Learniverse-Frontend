import React from 'react';
import '../../App.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Hamburger() {

    const [showMenu, setShowMenu] = useState(null);
    const [hasMounted, setHasMounted] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

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

    useEffect(() => {
      if(showMenu) {
        setHasMounted(true);
      }
    }, [showMenu])

  return (
    <div ref={containerRef}>
        <img className='User-Icon' onClick={() => setShowMenu(!showMenu)} src={require("../../public/assets/images/hamburger-icon.png")} alt="Open menu" />
        <div className={`Hamburger-Menu-Container ${hasMounted ? showMenu : '' }`}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', cursor:'pointer' }} onClick={() => {navigate("/"); setShowMenu(!showMenu);}}>
              <img className='Company-Logo' src={require('../../public/assets/images/LCLogo.png')} alt='Learniverse Connect company logo'/>
              <a className='Logo-Text'>Learniverse Connect</a>
            </div>
            <h3>Explore Categories</h3>
            <p style={{cursor:'pointer'}} onClick={() => {navigate("/search?category=Information+Technologies"); setShowMenu(!showMenu);}}>Information Technologies</p>
            <p style={{cursor:'pointer'}} onClick={() => {navigate("/search?category=Digital+Marketing"); setShowMenu(!showMenu);}}>Digital Marketing</p>
            <p style={{cursor:'pointer'}} onClick={() => {navigate("/search?category=Business+and+Entrepreneurship"); setShowMenu(!showMenu);}}>Business and Entrepreneurship</p>
            <p style={{cursor:'pointer'}} onClick={() => {navigate("/search?category=Data+Science+and+Analytics"); setShowMenu(!showMenu);}}>Data Science and Analytics</p>
        </div>
    </div>
  );
}

export default Hamburger;