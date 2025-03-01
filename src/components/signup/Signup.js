import '../../App.css';

function SignUpContainer() {
  return (
    <div className="Login-Container">
        <h2>Sign up</h2>
        <div><text>Already have an account? </text><a href='/login'>Login</a></div>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <text>First name</text>
              <input type='name' placeholder='first name' />
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              <text>Last name</text>
              <input type='name' placeholder='first name' />
            </div>
        </div>

        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Email</text>
            <input type='text' placeholder='password' />
        </div>

        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Phone number</text>
            <input type='text' placeholder='Phone number' />
        </div>

        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Password</text>
            <input type='password' placeholder='password' />
        </div>

        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Verify password</text>
            <input type='password' placeholder='password' />
        </div>

        <div style={{display:'flex', flexDirection:'row'}}>
            <input type='checkbox' value={true} />
            <text>I accept the&#8201;</text><a href=''>terms and conditions</a>
        </div>

        <button>Create new account</button>
    </div>
  );
}

export default SignUpContainer;