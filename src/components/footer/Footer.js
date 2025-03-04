import '../../App.css';

function Footer() {
  return (
    <footer className="Footer-Container">
      <div className='Disclamer-Container'>
        <text className='Disclamer-Text' style={{textAlign:'center'}}>This website is a result of a university group project, performed in the course IDATA2301 Web technologies, at NTNU. All the information provided here is a result of imagination. Any resemblance with real companies or products is a coincidence.</text>
      </div>
      <div className='Rights-Container'>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center' }}>
          <img style={{height:'48px'}} src={require('../../public/assets/images/LCLogo.png')}/>
          <a className='Logo-Text'>Learniverse Connect</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;