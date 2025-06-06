import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notify } from '../common/toaster/Toaster';
import providerService from '../../service/providerService';
import { CloseModal, OpenModal } from '../common/modal/Modal';
import userService from '../../service/userService';
import Table from '../common/table/Table';

function Provider() {

  const location = useLocation();
  const navigate = useNavigate();

  const [providerDataForm, setProviderDataForm] = useState(location?.state?.provider || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const {name, value} = event.target;

    setProviderDataForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdate = (response) => {
    if(response.status == 200) {
      notify("SUCCESS", "Provider updated successfully");
      setIsEditing(false);
    }
  }

  const updateProvider = () => {
    providerService.updateProvider(providerDataForm.id, providerDataForm, handleUpdate);
  }

  const onDelete = () => {
    navigate("/admin/providers");
    CloseModal();
  }

  return(
    <section className='User-Edit-Container'>
      
      <h2>Provider</h2>

      <div className='User-Edit-Input'>
        <span>ID</span>
        <input disabled={true} value={providerDataForm.id} />
      </div>

      <div className='User-Edit-Input'>
        <span>Provider Name</span>
        <input type='text' name='providerName' disabled={!isEditing} value={providerDataForm.providerName} onChange={handleInput} />
      </div>

      <div className='User-Edit-Input'>
        <span>Provider Page</span>
        <input type='text' name='providerUrl' disabled={!isEditing} value={providerDataForm.providerUrl} onChange={handleInput} />
      </div>

      <div className='User-Edit-Input'>
        <span>Logo Url</span>
        <input type='text' name='providerLogoUrl' disabled={!isEditing} value={providerDataForm.providerLogoUrl} onChange={handleInput} />
      </div>

      {!isEditing && <button onClick={() => setIsEditing(!isEditing)}>Edit Provider</button>}
      {isEditing && <button onClick={() => updateProvider()}>Save Changes</button>}
      {isEditing && <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>}

      <h3>Options</h3>
      <button onClick={() => OpenModal(<AddUser provider={providerDataForm} />)}>Add User</button>

      <h3>Delete</h3>
      
      <button className='button-delete' onClick={() => OpenModal(<DeleteProvider provider={providerDataForm} onDelete={onDelete}/>)}>Delete Provider</button>
    
    </section>
  )
}

export default Provider;

function AddUser({ provider }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchParameter, setSearchParameter] = useState("");

  const handleAddResponse = (response) => {
    if(response.status == 200) {
      notify("SUCCESS", "User added to provider");
      CloseModal();
    }
  }

  const onClick = (row) => {
    providerService.addUserToProvider(provider.id, row.id, handleAddResponse);
  }

  const handleChange = (event) => {
    setSearchParameter({fullName:event.target.value});
  }

  const handleSearchResponse = (response) => {
    const usersOnly = response.data
      .map(item => item.user)
      .filter(user => user.provider === null);
    setSearchResult(usersOnly);
    console.log(usersOnly);
  }

  useEffect(() => {
    userService.search(searchParameter, handleSearchResponse);
  }, [searchParameter]);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
      <h2>Add User</h2>
      <input style={{width:'100%'}} type='text' placeholder='Search for user with name' onChange={handleChange}/>
      {searchResult.length > 0 ?
        <Table tableSchema={{
        "ID": "id", 
        "First Name": "firstName", 
        "Last Name": "lastName",
        "Email": "email",
        "Phone Number": "phoneNumber"
        }} 
        data={searchResult} 
        onClick={onClick}/>
      :
        <p style={{textAlign:'center'}}>No results</p>
      }
    </div>
  )
}

function DeleteProvider({ provider, onDelete }) {

  const handleResponse = (response) => {
    if(response.status == 204) {
      notify("SUCCESS", "Provider successfully deleted");
      onDelete();
    }
  }

  const deleteProvider = () => {
    providerService.delete(provider.id, handleResponse, () => {
      notify("ERROR", "Cannot delete provider with courses"); 
      CloseModal();
    });
  }

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'16px'}}>
      <h2>Delete Provider</h2>
      <h4 style={{textAlign:'center'}}>Are you sure?</h4>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'center', gap:'16px'}}>
        <button style={{flexGrow:'1'}} className="button-delete" onClick={() => deleteProvider()}>Yes</button>
        <button style={{flexGrow:'1'}} onClick={() => CloseModal()}>No</button>
      </div>
    </div>
  )
}