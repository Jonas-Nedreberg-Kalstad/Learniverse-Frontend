import { Fetch } from "./apiService";

class EnrollService {

    enroll(data, handleResponse) {
        Fetch("POST", `api/user/orders/create`, data, handleResponse);
    }

    getEnrollments(handleResponse) {
        Fetch("GET", `api/user/course-enrollments/history`, null, handleResponse);
    }

    getTransactions(handleResponse) {
        Fetch("GET", `api/user/orders/history`, null, handleResponse);
    }

    getReciept(id, handleResponse) {
        Fetch("GET", `api/user/receipts/${id}`, null, handleResponse, null, 'blob');
    }

}

export default new EnrollService();