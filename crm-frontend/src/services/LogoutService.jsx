class LogoutService {

    logout() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "role"
        );

        localStorage.removeItem(
            "name"
        );

        window.location.href = "/";
    }
}

export default new LogoutService();