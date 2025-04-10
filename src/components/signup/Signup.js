import '../../App.css';
import React, { useState, useEffect } from 'react';
import Tos from '../tos/Tos.js';
import { Fetch } from '../../service/apiService.js';
import { setRolesFromJWT } from '../../utils/role.js';
import Cookies from 'universal-cookie';
import { OpenModal } from '../Modal.js';

function SignUp() {

  const cookies = new Cookies();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [warning, setWarning] = useState('');

  // Effect to disable scrolling when the terms of service modal is open
  useEffect(() => {
    if (showTos) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Cleanup to ensure scrolling is re-enabled if the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showTos]);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'firstName':
        setFirstName(value.replace(/\s+/g, ''));
        break;
      case 'lastName':
        setLastName(value.replace(/\s+/g, ''));
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value.replace(/[^\d.]/g, '').slice(0, 8));
        break;
      case 'password':
        setPassword(value);
        break;
      case 'verifyPassword':
        setVerifyPassword(value);
        break;
      case 'checkBox':
        setIsChecked(!isChecked);
        break;
      default:
        break;
    }
  }

  const validateForm = () => {
    if(firstName.length < 1 || lastName.length < 1) {
      setWarning("Please enter a valid name.");
      return false;
    } else if(email.length < 1) {
      setWarning("Please enter a valid email address.");
      return false;
    } else if(phoneNumber.length > 0 && /^\d{8}$/.test(phoneNumber) === false) {
      setWarning("Please enter a valid norwegian phone number.");
      return false;
    } else if(password.length < 4) {
      setWarning("Please enter a password with at least 4 characters.");
      return false;
    } else if(password !== verifyPassword) {
      setWarning("Please make sure that the passwords match.");
      return false;
    } else if(isChecked === false) {
      setWarning("Please accept the terms and conditions.");
      return false;
    }
    setWarning("");
    return true;
  }

  const login = (response) => {
    if(response.status == 200) {
      cookies.set('JWT', response.data.response, {maxAge: 12*3600, path: '/'});

      // Decodes the jwt token and checks the users authority.
      setRolesFromJWT(response.data.response);
      
      window.location.href = '/';
    }
  }

  const handleResponse = (response) => {
    if(response.status === 201) {
      const data = {
        email:email, 
        password:password 
      };
      Fetch("POST", "api/anonymous/authenticate", data, login);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!validateForm()) {
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    Fetch("POST", "api/anonymous/register", data, handleResponse);
  }

  return (
    <form className="Login-Container" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div><text>Already have an account? </text><a href='/login'>Login</a></div>

        <div style={{display:'flex', flexDirection:'row', gap:'10%', justifyContent:'space-between', width:'90%'}}>
            <div style={{width:'45%',display:'flex', flexDirection:'column'}}>
              <text>First name</text>
              <input name='firstName' type='name' placeholder='first name' value={firstName} onChange={handleInput} />
            </div>
            <div style={{width:'45%',display:'flex', flexDirection:'column'}}>
              <text>Last name</text>
              <input name='lastName' type='name' placeholder='last name' value={lastName} onChange={handleInput} />
            </div>
        </div>

        <div style={{width:'90%', display:'flex', flexDirection:'column'}}>
            <text>Email</text>
            <input name='email' type='email' placeholder='password' value={email} onChange={handleInput} />
        </div>

        <div style={{width:'90%', display:'flex', flexDirection:'column'}}>
            <text>Phone number (Optional)</text>
            <input name='phoneNumber' type='text' placeholder='Phone number' value={phoneNumber} onChange={handleInput} />
        </div>

        <div style={{width:'90%', display:'flex', flexDirection:'column'}}>
            <text>Password</text>
            <input name='password' type='password' placeholder='password' value={password} onChange={handleInput} />
        </div>

        <div style={{width:'90%', display:'flex', flexDirection:'column'}}>
            <text>Verify password</text>
            <input name='verifyPassword' type='password' placeholder='password' value={verifyPassword} onChange={handleInput} />
        </div>

        <div style={{width:'90%', display:'flex', flexDirection:'row'}}>
            <input name='checkBox' type='checkbox' value={isChecked} onChange={handleInput} />
            <text>I accept the&#8201;</text><a className='Text-Link' onClick={() => {OpenModal(<Tos/>)}}>terms and conditions</a>
        </div>

        <button type='submit'>Create new account</button>

        <span className='Text-Warning'>{warning}</span>
    </form>
  );
}

export default SignUp;