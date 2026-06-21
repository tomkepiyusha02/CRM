import api from "./AxiosInterceptor";

const BASE_URL =
    "http://localhost:8080/visit";

class SiteVisitService {

    addVisit(visit) {

        return api.post(
            `${BASE_URL}/add`,
            visit
        );
    }

    getAllVisits() {

        return api.get(
            `${BASE_URL}/all`
        );
    }

    getByAgent(agentId) {

        return api.get(
            `${BASE_URL}/agent/${agentId}`
        );
    }

    getByLead(leadId) {

        return api.get(
            `${BASE_URL}/lead/${leadId}`
        );
    }

    updateVisit(id, visit) {

        return api.put(
            `${BASE_URL}/update/${id}`,
            visit
        );
    }

    deleteVisit(id) {

        return api.delete(
            `${BASE_URL}/delete/${id}`
        );
    }
}

export default new SiteVisitService();