import '../App.css';

function Footer() {
  return (
    <div className="Footer-Container">
      <div className='Disclamer-Container'>
        <text className='Disclamer-Text' style={{textAlign:'center'}}>This website is a result of a university group project, performed in the course IDATA2301 Web technologies, at NTNU. All the information provided here is a result of imagination. Any resemblance with real companies or products is a coincidence.</text>
      </div>
      <div className='Rights-Container'>
        <text className='Logo-Text'>LEARNIVERSE CONNECT</text>
      </div>
    </div>
  );
}

export default Footer;