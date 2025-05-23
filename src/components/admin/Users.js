import React, { useState, useEffect } from 'react';
import userService from '../../service/userService';
import { forEach } from 'lodash';
import { CloseModal, OpenModal } from '../common/modal/Modal';
import { notify } from '../common/toaster/Toaster';
import Table from '../common/table/Table';
import User from './User';
import { useNavigate } from 'react-router-dom';

function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchParameter, setSearchParameter] = useState('');

    const handleResponse = (response) => {
        console.log(response.data);
        if(response.status == 200) {
            setUsers(response.data);
        }
    }

    const handleChange = (event) => {
        setSearchParameter(event.target.value);
        console.log(event.target.value);
      }
    
    const handleSearchResponse = (response) => {
      const usersOnly = response.data.map(item => item.user);
      setSearchResult(usersOnly);
      console.log(response.data);
    }
    
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (searchParameter.length > 0) {
          userService.search(searchParameter, handleSearchResponse);
        } else {
          setSearchResult([]);
        }
      }, 500); // 500ms debounce

      return () => clearTimeout(delayDebounce);
    }, [searchParameter]);

    useEffect(() => {
        userService.getActiveUsers(handleResponse);
    }, []);

    const onClick = (user) => {
      navigate(`/admin/user/${user.id}`, { state: { user } });
    }

return (
    <section className='Users-Container'>
      <h2>Users</h2>
      <button style={{width:'100%'}} onClick={() => OpenModal(<CreateUser />)}>Create New User</button>
      <input style={{width:'100%', marginTop:'16px'}} type='text' placeholder='Search for user with name' onChange={handleChange}/>
      <Table tableSchema={{
        "ID": "id", 
        "Role": "roles[0].role",
        "First Name": "firstName", 
        "Last Name": "lastName",
        "Email": "email",
        "Phone Number": "phoneNumber"
        }} 
        data={searchParameter.length > 0 ? searchResult : users}
        onClick={onClick}/>
    </section>
);
}

export default Users;

function CreateUser() {

  const [verifyPassword, setVerifyPassword] = useState('')
  const [userDataForm, setUserDataForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleResponse = (response) => {
    if(response.status == 201) {
      notify("SUCCESS", "Provider account successfully created");
      CloseModal();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(userDataForm.password !== verifyPassword) {
      notify("ERROR", "Passwords do not match!");
      return;
    }

    userService.createProviderUser(userDataForm, handleResponse);
  }

  return (
    <form style={{display:'flex', flexDirection:'column', gap:'8px'}} onSubmit={handleSubmit}>
      
      <label>First Name:</label>
      <input type='text' name='firstName' placeholder='input first name' value={userDataForm.firstName} onChange={handleInput} required/>
      
      <label>Last Name:</label>
      <input type='text' name='lastName' placeholder='input last name' value={userDataForm.lastName} onChange={handleInput} required/>
      
      <label>Email:</label>
      <input type='email' name='email' placeholder='input email' value={userDataForm.email} onChange={handleInput} required/>
      
      <label>Phone Number (Optional):</label>
      <input type='text' name='phoneNumber' placeholder='input phone number' value={userDataForm.phoneNumber} onChange={handleInput} />
      
      <label>Password:</label>
      <input type='password' name='password' placeholder='input password' value={userDataForm.password} onChange={handleInput} required/>
      
      <label>Verify Password:</label>
      <input type='password' placeholder='verify password' value={verifyPassword} onChange={(event) => {setVerifyPassword(event.target.value)}} required/>
      
      <button>Create Provider Account</button>
      
    </form>
  )
}