import '../../App.css';
import React, { useState } from "react";
import axios from "axios";
import { URL } from '../../utils/url';
import Cookies from 'universal-cookie';
import { setRolesFromJWT } from '../../utils/role';
import { Fetch } from '../../service/apiService';

const cookies = new Cookies();

function Login() {
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

  const handleResponse = (response) => {
    if(response.status == 200) {
      cookies.set('JWT', response.data.response, {maxAge: 12*3600, path: '/'});

      // Decodes the jwt token and checks the users authority.
      setRolesFromJWT(response.data.response);
      
      window.location.href = '/';
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email:inputEmailValue, 
      password:inputPasswordValue 
    };

    Fetch("POST", "api/anonymous/authenticate", data, handleResponse);
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

export default Login;