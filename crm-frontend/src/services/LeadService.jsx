import axios from "axios";

const API_URL = "http://localhost:8080/Lead";

class LeadService {

    getAllLeads() {
        return axios.get(`${API_URL}/displayAll`);
    }

    getLeadById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    addLead(lead) {
        return axios.post(`${API_URL}/add`, lead);
    }

    updateLead(id, lead) {
        return axios.put(`${API_URL}/update/${id}`, lead);
    }
}

export default new LeadService();