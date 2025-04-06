import React, { useState, useEffect } from 'react';
import providerService from '../../service/providerService';
import { notify } from '../Toaster';
import { OpenModal, CloseModal } from '../Modal';
import userService from '../../service/userService';
import Table from '../Table';
import { useNavigate } from 'react-router-dom';

function Providers() {

  const navigate = useNavigate();

    const [providers, setProviders] = useState([]);


    const handleResponse = (response) => {
        console.log(response.data);
        if(response.status == 200) {
            setProviders(response.data);
        }
    }

    useEffect(() => {
        providerService.getAllProviders(handleResponse);
    }, []);

    const onClick = (row) => {
      navigate(`/admin/provider/${row.id}`, { state:{provider:row} });
    }

return (
    <div>
      <h2>Providers</h2>
      <button style={{width:'100%'}} onClick={() => OpenModal(<CreateProvider />)}>Create New Provider</button>
      <Table tableSchema={{
        "ID": "id", 
        "Provider Name": "providerName"
        }} 
        data={providers} 
        onClick={onClick} />
    </div>
);
}

export default Providers;

function CreateProvider() {

  const [providerDataForm, setProviderDataForm] = useState({
    providerName: '',
    providerUrl: '',
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setProviderDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleResponse = (response) => {
    if(response.status == 201) {
      notify("SUCCESS", "Provider successfully created");
      CloseModal();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    providerService.create(providerDataForm, handleResponse);
  }

  return (
    <form style={{display:'flex', flexDirection:'column', gap:'8px'}} onSubmit={handleSubmit}>
      <label>Provider Name:</label>
      <input type='text' name='providerName' placeholder='input first name' value={providerDataForm.providerName} onChange={handleInput} required/>
      <label>Link to Provider:</label>
      <input type='text' name='providerUrl' placeholder='input last name' value={providerDataForm.providerUrl} onChange={handleInput} required/>
      <button>Create Provider</button>
    </form>
  )
}