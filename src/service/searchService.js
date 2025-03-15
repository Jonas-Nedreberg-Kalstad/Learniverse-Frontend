import { Fetch } from "./apiService";

class SearchService {
    multiParameterSearch(data, handleResponse) {
        return Fetch("POST", "api/anonymous/multiParameterSearch", data, handleResponse);
    }

    courseSearch(data, handleResponse) {
        return Fetch("POST", "api/anonymous/courseSearch", data, handleResponse);
    }

    categorySearch(data, handleResponse) {
        return Fetch("POST", "api/anonymous/categorySearch", data, handleResponse);
    }

    topicSearch(data, handleResponse) {
        return Fetch("POST", "api/anonymous/topicSearch", data, handleResponse);
    }

    findCourseByFilteringIdsAndMaxPrice(data, handleResponse, page=0, size=5) {
        return Fetch("POST", `api/anonymous/search/findCourseByFilteringIdsAndMaxPrice?page=${page > 0 ? page - 1 : 0}&size=${size}`, data, handleResponse);
    }
}

export default new SearchService();