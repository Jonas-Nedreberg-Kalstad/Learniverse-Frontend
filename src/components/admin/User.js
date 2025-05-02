import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "../common/toaster/Toaster";
import userService from "../../service/userService";
import providerService from "../../service/providerService";
import { CloseModal, OpenModal } from "../common/modal/Modal";

function User() {

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state?.user);

  const [userDataForm, setUserDataForm] = useState(location.state?.user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const handleInput = (event) => {
    const {name, value} = event.target;

    setUserDataForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    setUserDataForm(userDataForm);
  }, [isEditing]);

  const handleUpdate = (response) => {
    if(response.status == 200) {
      notify("SUCCESS", "User has been updated!");
    }
  }

  const updateUserError = (error) => {
    const firstKey = Object.keys(error.response.data)[0]
    notify("ERROR", error.response.data[firstKey]);
  }

  const updateUser = () => {
    userService.updateUser(userDataForm.id, userDataForm, handleUpdate, updateUserError);
  }

  const handleRemoval = (response) => {
    if(response.status == 200) {
      notify("SUCCESS", "Provider removed from user");
      setUserDataForm((prev) => ({
        ...prev,
        provider: null
      }));
    }
  }

  const removeFromProvider = () => {
    providerService.addUserToProvider(0, userDataForm.id, handleRemoval);
  }

  const handleDelete = (response) => {
    console.log(response);
    if(response.status == 204) {
      CloseModal();
      notify("SUCCESS", "User has been deleted!");
      navigate('/admin/users');
    }
  }

  const deleteUser = () => {
    userService.deleteUser(userDataForm.id, handleDelete);
  }

  return(
    <div className='User-Edit-Container'>

      <h2>User</h2>
      <div className='User-Edit-Input'>
        <span>ID</span>
        <input disabled={true} value={userDataForm.id} />
      </div>
      <div className='User-Edit-Input'>
        <span>First Name</span>
        <input type='text' name='firstName' disabled={!isEditing} value={userDataForm.firstName} onChange={handleInput} />
      </div>
      <div className='User-Edit-Input'>
        <span>Last Name</span>
        <input type='text' name='lastName' disabled={!isEditing} value={userDataForm.lastName} onChange={handleInput} />
      </div>

      <h3>Contact Infromation</h3>
      <div className='User-Edit-Input'>
        <span>Email</span>
        <input type='email' name='email' disabled={!isEditing} value={userDataForm.email} onChange={handleInput} />
      </div>
      <div className='User-Edit-Input'>
        <span>Phone</span>
        <input type='number' name='phoneNumber' disabled={!isEditing} value={userDataForm.phoneNumber} onChange={handleInput} />
      </div>

      {!isEditing && <button onClick={() => setIsEditing(!isEditing)}>Edit User</button>}

      {isEditing && <button onClick={() => updateUser()}>Save Changes</button>}
      {isEditing && <button onClick={() => {setIsEditing(!isEditing)}}>Cancel</button>}

      <h3>Account Security</h3>
      <button>Reset Password</button>
      <button className="button-delete" onClick={() => OpenModal(<DeleteUser deleteUser={deleteUser} />)}>Delete User</button>

      {userDataForm.provider &&
        (<>
          <h3>Provider</h3>
          <div className='User-Edit-Input'>
            <span>ID</span>
            <input type='text' name='providerID' disabled={true} value={userDataForm.provider?.id}/>
          </div>
          <div className='User-Edit-Input'>
            <span>Name</span>
            <input type='text' name='providerName' disabled={true} value={userDataForm.provider?.providerName} />
          </div>
          <button onClick={() => navigate(`/admin/provider/${userDataForm.provider.id}`, { state:{ provider:userDataForm.provider } })}>Show Provider</button>
          <button className="button-delete" onClick={() => removeFromProvider()}>Remove Provider</button>
        </>)
      }
    </div>
  )
}

export default User;

function DeleteUser({ deleteUser }) {

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'16px'}}>
      <h2>Delete User</h2>
      <h4 style={{textAlign:'center'}}>Are you sure?</h4>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'center', gap:'16px'}}>
        <button style={{flexGrow:'1'}} className="button-delete" onClick={() => deleteUser()}>Yes</button>
        <button style={{flexGrow:'1'}} onClick={() => CloseModal()}>No</button>
      </div>
    </div>
  )
}