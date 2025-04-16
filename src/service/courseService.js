import { Fetch } from "./apiService";

class CourseService {

    getCourse(id, handleResponse) {
        Fetch("GET", `api/anonymous/courses/${id}`, null, handleResponse);
    }

    mostPopularCourses(handleResponse) {
        return Fetch("GET", "api/anonymous/mostPopularCourses?page:0&size:5", null, handleResponse);
    }

    getProviderCourses(handleResponse) {
        return Fetch("GET", "api/provider/courses", null, handleResponse);
    }

    createCourse(data, handleResponse) {
        return Fetch("POST", "api/provider/courses", data, handleResponse);
    }

    updateCourse(id, data, handleResponse) {
        return Fetch("PATCH", `api/provider/courses/${id}`, data, handleResponse);
    }

    adminUpdateCourse(id, data, handleResponse) {
        return Fetch("PATCH", `api/admin/courses/${id}`, data, handleResponse);
    }

    getReviews(id, handleResponse) {
        return Fetch("GET", `api/anonymous/reviews/course/${id}/helpful?size=100`, null, handleResponse);
    }

    createReview(data, handleResponse) {
        return Fetch("POST", `api/user/reviews`, data, handleResponse);
    }
}

export default new CourseService();