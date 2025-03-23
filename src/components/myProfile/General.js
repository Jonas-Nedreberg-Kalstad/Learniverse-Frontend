import { set } from "lodash";
import React, { useEffect, useState } from "react";
import userService from "../../service/userService";
import { CloseModal, OpenModal } from "../Modal";
import { notify } from "../Toaster";


function General() {

    const [userData, setUserData] = useState(null);

    const handleResponse = (response) => {
        if(response.status == 200) {
            setUserData(response.data);
        }
    }

    useEffect(() => {
        userService.getUserData(handleResponse);
    }, []);

return (
    <div className="General-Container">

        <h3>General</h3>
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <span>First Name</span>
               <input name="firstName" disabled={true} value={userData?.firstName} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <span>Last Name</span>
               <input name="lastName" disabled={true} value={userData?.lastName} />
            </div>
        </div>

        <h3>Contact Information</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <span>Email Address</span>
               <input name="email" disabled={true} value={userData?.email} type="email" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <span>Phone Number</span>
               <input name="phoneNumber" disabled={true} value={userData?.phoneNumber} />
            </div>
        </div>
        
        <h3>Account Security</h3>
        <button onClick={() => OpenModal(<UpdatePassword />)}>Change Password</button>
    </div>
  );
}

export default General;

function UpdatePassword() {

    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    const verifyPassword = () => {
        if(newPassword.length < 4) return false;
        if(newPassword === verifyNewPassword) return true;
        return false;
    }

    const handleInput = (event) => {
        const {name, value} = event.target;
        if(name === "newPassword") {
            setNewPassword(value);
        } else {
            setVerifyNewPassword(value);
        }
    }

    useEffect(() => {
        setIsValid(verifyPassword());
    }, [newPassword, verifyNewPassword]);

    const handleResponse = (response) => {
        if(response.status == 200) {
            notify("SUCCESS", "Password has been changed");
            CloseModal();
        }
    }

    const changePassword = () => {
        const data = { password: newPassword }
        userService.changeMyPassword(data, handleResponse);
    }

    return (
        <div style={{display:'flex', flexDirection:'column', gap:'0px'}}>
            <h2>Change Password</h2>
            <p>New Password</p>
            <input type="password" name="newPassword" placeholder="input new password" onChange={handleInput}/>
            <p>Confirm New Password</p>
            <input type="password" name="verifyPassword" placeholder="verify new password" onChange={handleInput}/>
            <br/>
            <button disabled={!isValid} onClick={() => changePassword()}>Change Password</button>
        </div>
    )
}