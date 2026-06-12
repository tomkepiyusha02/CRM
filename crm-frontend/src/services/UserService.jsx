import api from "./AxiosInterceptor";

const BASE_URL = "/user";

class UserService {

    getAllUsers() {

        return api.get(
            `${BASE_URL}/displayAll`
        );
    }

    getManagers() {

        return api.get(
            `${BASE_URL}/managers`
        );
    }

    getAgents() {

        return api.get(
            `${BASE_URL}/agents`
        );
    }

    getUserById(id) {

        return api.get(
            `${BASE_URL}/${id}`
        );
    }

    addUser(user) {

        return api.post(
            `${BASE_URL}/add`,
            user
        );
    }

    updateUser(id, user) {

        return api.put(
            `${BASE_URL}/update/${id}`,
            user
        );
    }

    deleteUser(id) {

        return api.delete(
            `${BASE_URL}/delete/${id}`
        );
    }

    getAgentsByManager(managerId) {

        return api.get(
            `${BASE_URL}/manager/${managerId}`
        );
    }
}

export default new UserService();