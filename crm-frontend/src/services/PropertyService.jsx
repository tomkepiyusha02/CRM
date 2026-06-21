
import api from "./AxiosInterceptor";

const BASE_URL = "http://localhost:8080/property";

class PropertyService {

    getAllProperties() {
        return api.get(`${BASE_URL}/displayAll`);
    }

    getPropertyById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    addProperty(property) {
        return api.post(`${BASE_URL}/add`, property);
    }

    updateProperty(id, property) {
        return api.put(`${BASE_URL}/update/${id}`, property);
    }

    deleteProperty(id) {
        return api.delete(`${BASE_URL}/delete/${id}`);
    }

    getByStatus(status) {
        return api.get(`${BASE_URL}/status/${status}`);
    }

    getByType(type) {
        return api.get(`${BASE_URL}/type/${type}`);
    }

    updatePropertyStatus(
        propertyId,
        status
    ) {
    
        return api.put(
            `${BASE_URL}/${propertyId}/status?status=${status}`
        );
    
    }
}

export default new PropertyService();