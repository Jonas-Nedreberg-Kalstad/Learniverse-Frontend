import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './Footer.css';
import { OpenModal } from '../common/modal/Modal';

function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="Footer-Container">
      
      <div className='Disclamer-Container'>
        <p className='Disclamer-Text' >This website is a result of a university group project, performed in the course IDATA2301 Web technologies, at NTNU. All the information provided here is a result of imagination. Any resemblance with real companies or products is a coincidence.</p>
      </div>

      <div className='Footer-Options-Container'>
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', width:'80vw', gap:'32px', maxWidth:'512px'}}>
          
          <nav style={{color: '#b2c0ca', flexGrow:'1'}}>
            <b>About</b>
            <p style={{cursor:'pointer', marginLeft:'0px'}} onClick={() => navigate('/about-us')}>About Us</p>
            <p style={{cursor:'pointer', marginLeft:'0px'}} onClick={() => navigate('/terms-of-service')}>Terms of Service</p>
          </nav>

          <address style={{color: '#b2c0ca', fontStyle: 'normal'}}>
            <b>Contact Us</b>
            <p style={{marginLeft:'0px'}}>Læringsveien 12B 5006 Bergen, Norge</p>
            <p style={{marginLeft:'0px'}}>Telephone: +47 400 12 345</p>
            <p style={{marginLeft:'0px'}}>Email: <a style={{color: '#b2c0ca'}} href="mailto:support@learnivereconnect.com">support@learnivereconnect.com</a></p>
          </address>

        </div>
      </div>

      <section className='Rights-Container'>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center' }}>
          <img className='Company-Logo' src={require('../../public/assets/images/LCLogo.png')} alt='Learniverse Connect company logo'/>
          <a className='Logo-Text'>Learniverse Connect</a>
        </div>
        <p style={{color: '#b2c0ca'}}>© 2025 Learniverse Connect. All rights reserved.</p>
      </section>
      
    </footer>
  );
}

export default Footer;