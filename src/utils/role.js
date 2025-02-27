// globals.js
import {jwtDecode} from "jwt-decode";

let isAdmin = false;
let isProvider = false;
let isUser = false;

const getIsAdmin = () => {
    return isAdmin;
}

const setIsAdmin = (status) => {
    isAdmin = status;
}

const getIsProvider = () => {
    return isProvider;
}

const setIsProvider = (status) => {
    isProvider = status;
}

const getIsUser = () => {
    return isUser;
}

const setIsUser = (status) => {
    isUser = status;
}

// Function to extract roles from JWT token and set admin, provider and user status
const setRolesFromJWT = (token) => {

    const decodedToken = token ? jwtDecode(token) : null;

    if (!decodedToken?.roles) {
        return;
    }

    decodedToken?.roles.forEach(role => {
        switch(role.authority) {
            case "ADMIN":
                setIsAdmin(true);
                break;
            case "PROVIDER":
                setIsProvider(true);
                break;
            case "USER":
                setIsUser(true);
                break;
        }
    });

};

export { getIsAdmin, setIsAdmin, getIsProvider, setIsProvider, getIsUser, setIsUser, setRolesFromJWT };