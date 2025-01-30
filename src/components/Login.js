import '../App.css';

function LoginContainer() {
  return (
    <div className="Login-Container">
        <h2>Login</h2>

        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Email</text>
            <input type='name' placeholder='Email' />
        </div>

        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Password</text>
            <input type='password' placeholder='password' />
        </div>

        <button>Login</button>

        <div><text>Don't have an account? </text><a href='/signup'>Create an account</a></div>
    </div>
  );
}

export default LoginContainer;