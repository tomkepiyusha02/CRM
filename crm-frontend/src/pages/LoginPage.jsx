import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../services/AuthService";
import "../styles/Login.css";

function LoginPage() {

    const navigate = useNavigate();

    const [loginMode, setLoginMode] =
        useState("PASSWORD");

    const [loginData, setLoginData] =
        useState({
            email: "",
            password: ""
        });

    const [emailOtp, setEmailOtp] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [otpSent, setOtpSent] =
        useState(false);

    const handleChange = (e) => {

        setLoginData({

            ...loginData,

            [e.target.name]:
                e.target.value
        });
    };

    const navigateUser = (role) => {

        if (role === "ADMIN") {

            navigate("/admin/dashboard");

        } else if (role === "MANAGER") {

            navigate("/dashboard");

        } else {

            navigate("/agent/dashboard");
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await AuthService.login(
                    loginData
                );
console.log(response.data);
            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "name",
                response.data.name
            );
            localStorage.setItem(
    "userId",
    response.data.userId
);

localStorage.setItem(
    "assignedCity",
    response.data.assignedCity
);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                timer: 1500,
                showConfirmButton: false
            });

            navigateUser(
                response.data.role
            );

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text:
                    error.response?.data ||
                    "Invalid Credentials"
            });
        }
    };

    const sendOTP = async () => {

        try {

            await AuthService.sendOtp(
                emailOtp
            );

            setOtpSent(true);

            Swal.fire({
                icon: "success",
                title: "OTP Sent Successfully"
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Unable To Send OTP",
                text:
                    error.response?.data ||
                    "Something Went Wrong"
            });
        }
    };

    const verifyOTP = async () => {

        try {

            const response =
                await AuthService.verifyOtp(
                    emailOtp,
                    otp
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "name",
                response.data.name
            );

            Swal.fire({
                icon: "success",
                title: "OTP Verified",
                timer: 1500,
                showConfirmButton: false
            });

            navigateUser(
                response.data.role
            );

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Invalid OTP",
                text:
                    error.response?.data ||
                    "OTP Verification Failed"
            });
        }
    };

    return (

        <div className="login-page">

            <div className="login-left">

                <div className="brand">

                    <i className="bi bi-buildings-fill brand-icon"></i>

                    <h2>eState CRM</h2>

                </div>

                <h1>

                    A Complete

                    <br />

                    Real Estate CRM

                    <br />

                    Solution

                </h1>

                <p>

                    Manage Enquiries,
                    Leads, Managers,
                    Agents and Properties
                    from one unified
                    dashboard.

                </p>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back</h2>

                    <p>
                        Sign in to your
                        CRM account
                    </p>

                    <div className="login-switch">

                        <button
                            type="button"
                            className={
                                loginMode ===
                                "PASSWORD"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setLoginMode(
                                    "PASSWORD"
                                )
                            }
                        >
                            Password Login
                        </button>
                        <button
    type="button"
    className={
        loginMode === "OTP"
            ? "active"
            : ""
    }
    onClick={() =>
        setLoginMode("OTP")
    }
>
    Admin OTP Login
</button>

                    </div>

                    {
                        loginMode === "PASSWORD"

                            ?

                            (

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

<p style={{
    color:"#dc3545",
    fontSize:"14px",
    marginBottom:"10px"
}}>
    OTP Login is available only for Admin.
</p>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={
                                            loginData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={
                                            loginData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="login-btn"
                                    >
                                        Sign In
                                    </button>

                                </form>

                            )

                            :

                            (

                                <div>

                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        value={emailOtp}
                                        onChange={(e) =>
                                            setEmailOtp(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="login-btn"
                                        onClick={sendOTP}
                                    >
                                        Send OTP
                                    </button>

                                    {otpSent && (

                                        <>

                                            <input
                                                type="text"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <button
                                                type="button"
                                                className="login-btn"
                                                onClick={verifyOTP}
                                            >
                                                Verify OTP
                                            </button>

                                        </>

                                    )}

                                </div>

                            )
                    }

                    <button
                        className="enquiry-btn"
                        onClick={() =>
                            navigate("/enquiry")
                        }
                    >
                        Find Your Dream Property
                    </button>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;