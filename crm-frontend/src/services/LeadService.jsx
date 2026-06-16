import api from "./AxiosInterceptor";

const API_URL =
"http://localhost:8080/Lead";

class LeadService {

  addLead(lead) {
    return api.post(
      `${API_URL}/add`,
      lead
    );
  }

  getAllLeads() {
    return api.get(
      `${API_URL}/displayAll`
    );
  }

  getLeadById(id) {
    return api.get(
      `${API_URL}/${id}`
    );
  }

  updateLead(id, lead) {
    return api.put(
        `${API_URL}/update/${id}`,
        lead
    );
}

deleteLead(id) {
    return api.delete(
        `${API_URL}/delete/${id}`
    );
}
getLeadsByCity(city){

    return api.get(
        `${API_URL}/city/${city}`
    );

}
}

export default new LeadService();