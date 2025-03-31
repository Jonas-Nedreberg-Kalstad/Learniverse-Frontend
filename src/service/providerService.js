import { Fetch } from "./apiService";

class ProviderService {
  getAllProviders(handleResponse, handleError) {
    return Fetch("GET", "api/admin/providers", null, handleResponse, handleError);
  }

  updateProvider(id, data, handleResponse, handleError) {
    return Fetch("PUT", `api/admin/providers/${id}`, data, handleResponse, handleError)
  }

  addUserToProvider(providerId, userId, handleResponse, handleError) {
    return Fetch("PATCH", `api/admin/providers/${providerId}/${userId}`, null, handleResponse, handleError);
  }

  delete(providerId, handleResponse, handleError) {
    return Fetch("DELETE", `api/admin/providers/${providerId}`, null, handleResponse, handleError);
  }

  create(data, handleResponse, handleError) {
    return Fetch("POST", `api/admin/providers`, data, handleResponse, handleError);
  }
}

export default new ProviderService();