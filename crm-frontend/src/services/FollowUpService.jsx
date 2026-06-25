import api from "./AxiosInterceptor";

const BASE_URL =
    "http://localhost:8080/followup";

class FollowUpService {

    getByAgent(agentId) {

        return api.get(
            `${BASE_URL}/agent/${agentId}`
        );
    }

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

    update(id,data) {

        return api.put(
            `${BASE_URL}/update/${id}`,
            data
        );
    }

    delete(id) {

        return api.delete(
            `${BASE_URL}/delete/${id}`
        );
    }
    getByAgent(agentId) {

        return api.get(
            `${BASE_URL}/agent/${agentId}`
        );
    }
  getAll() {
    return api.get(`${BASE_URL}/all`);
}

getByAgent(agentId) {
    return api.get(`${BASE_URL}/agent/${agentId}`);
}

}

export default new FollowUpService();