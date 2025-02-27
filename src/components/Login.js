import '../App.css';
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { URL } from '../utils/url';
import { setRolesFromJWT } from '../utils/role';

function LoginContainer() {

  const [cookies, setCookie, removeCookie] = useCookies();

  const [inputEmailValue, setInputEmailValue] = useState("")
  const [inputPasswordValue, setInputPassowrdValue] = useState("")

  const handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    switch (name) {
      case 'email':
        setInputEmailValue(value);
        break;
      case 'password':
        setInputPassowrdValue(value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userCredentials = { email:inputEmailValue, password:inputPasswordValue }
    axios.post(`${URL.BACKEND}/api/anonymous/authenticate`, userCredentials)
    .then(response => {
      if(response.status == 200) {
        setCookie('JWT', response.data.response, {maxAge: 12*3600, path: '/'});
        
        // Decodes the jwt token and checks the users authority.
        setRolesFromJWT(response.data.response);
        
        window.location.href = '/';
      }
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
  };

  return (
    <form className="Login-Container" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div style={{display:'flex', flexDirection:'column', width:'75%'}}>
            <text>Email</text>
            <input type='email' name='email' value={inputEmailValue} onChange={handleInputChange} placeholder='Email' />
        </div>

        <div style={{display:'flex', flexDirection:'column', width:'75%'}}>
            <text>Password</text>
            <input type='password' name='password' value={inputPasswordValue} onChange={handleInputChange} placeholder='password' />
        </div>

        <button style={{width:'50%'}} type="submit">Login</button>

        <div><text>Don't have an account? </text><a href='/signup'>Create an account</a></div>
    </form>
  );
}

export default LoginContainer;