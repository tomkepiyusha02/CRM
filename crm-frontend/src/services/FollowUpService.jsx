import api from "./AxiosInterceptor";

const BASE_URL =
    "http://localhost:8080/followup";

class FollowUpService {

    getAll(agentId) {

        return api.get(
            `${BASE_URL}/agent/${agentId}`
        );
    }

    addFollowUp(data) {

        return api.post(
            `${BASE_URL}/add`,
            data
        );
    }

    update(id, data) {

        return api.put(
            `${BASE_URL}/update/${id}`,
            data
        );
    }

}

export default new FollowUpService();