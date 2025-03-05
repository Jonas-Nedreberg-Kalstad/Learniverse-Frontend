import { Fetch } from "./apiService";

class UserService {
  authenticate(data, handleResponse, handleError) {
    return Fetch("POST", "api/anonymous/authenticate", data, handleResponse, handleError);
  }

  getUserData(handleResponse, handleError) {
    return Fetch("GET", "api/user/userDetails", null, handleResponse, handleError);
  }

  getAllUsers(handleResponse, handleError) {
    return Fetch("GET", "api/admin/users", null, handleResponse, handleError);
  }

  getActiveUsers(handleResponse, handleError) {
    return Fetch("GET", "api/admin/activeUsers", null, handleResponse, handleError);
  }

  updateUser(id, data, handleResponse, handleError) {
    return Fetch("PATCH", `api/admin/users/${id}`, data, handleResponse, handleError);
  }

  deleteUser(id, handleResponse, handleError) {
    return Fetch("DELETE", `api/admin/users/${id}`, null, handleResponse, handleError);
  }

  search(data, handleResponse, handleError) {
    return Fetch("POST", `api/admin/search/userFullName`, data, handleResponse, handleError);
  }

  changeMyPassword(data, handleResponse, handleError) {
    return Fetch("PATCH", `api/user/userDetails/password`, data, handleResponse, handleError);
  }

  createProviderUser(data, handleResponse, handleError) {
    return Fetch("POST", `api/admin/register`, data, handleResponse, handleError);
  }
}

export default new UserService();