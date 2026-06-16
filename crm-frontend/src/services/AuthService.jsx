import axios from "axios";

const BASE_URL =
    "http://localhost:8080/auth";

class AuthService {

    // Password Login
    login(data) {

        return axios.post(
            `${BASE_URL}/login`,
            data
        );
    }

    // OTP Login
    mobileLogin(mobile) {

        return axios.post(
            `${BASE_URL}/mobile-login`,
            {
                mobile
            }
        );
    }

    // Logout
    logout() {

        localStorage.clear();

        window.location.href = "/login";
    }

    // Get JWT Token
    getToken() {

        return localStorage.getItem(
            "token"
        );
    }

    // Get Role
    getRole() {

        return localStorage.getItem(
            "role"
        );
    }

    // Get Name
    getName() {

        return localStorage.getItem(
            "name"
        );
    }

    // Check Login
    isLoggedIn() {


        return !!localStorage.getItem(
            "token"
        );
    }
    sendOtp(email) {

        return axios.post(
            `${BASE_URL}/send-otp`,
            { email }
        );
    }
    
    verifyOtp(email, otp) {
    
        return axios.post(
            `${BASE_URL}/verify-otp`,
            {
                email,
                otp
            }
        );
    }
}

export default new AuthService();