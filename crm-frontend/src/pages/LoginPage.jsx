import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import AuthService from "../services/AuthService";

import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

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

    const [mobile, setMobile] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [confirmationResult,
        setConfirmationResult] =
        useState(null);

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

            if (!mobile.trim()) {

                Swal.fire({
                    icon: "error",
                    title: "Enter Mobile Number"
                });

                return;
            }

            let phoneNumber =
                mobile.trim();

            if (
                !phoneNumber.startsWith("+")
            ) {

                phoneNumber =
                    `+91${phoneNumber}`;
            }

            console.log(
                "Sending OTP To:",
                phoneNumber
            );

            if (
                !window.recaptchaVerifier
            ) {

                window.recaptchaVerifier =
                    new RecaptchaVerifier(
                        auth,
                        "recaptcha-container",
                        {
                            size: "normal"
                        }
                    );
            }

            const result =
                await signInWithPhoneNumber(
                    auth,
                    phoneNumber,
                    window.recaptchaVerifier
                );

            setConfirmationResult(
                result
            );

            Swal.fire({
                icon: "success",
                title:
                    "OTP Sent Successfully"
            });

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "OTP Error",
                text: error.message
            });
        }
    };

    const verifyOTP = async () => {

        try {

            await confirmationResult.confirm(
                otp
            );

            const mobileNumber =
                mobile.startsWith("+91")
                    ? mobile.replace("+91", "")
                    : mobile;

            const response =
                await AuthService.mobileLogin(
                    mobileNumber
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

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Invalid OTP",
                text:
                    error.response?.data ||
                    error.message
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
                                loginMode ===
                                "OTP"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setLoginMode(
                                    "OTP"
                                )
                            }
                        >
                            OTP Login
                        </button>

                    </div>

                    {

                        loginMode ===
                            "PASSWORD"

                            ?

                            (

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

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
                                        type="text"
                                        placeholder="+919589163445"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        className="login-btn"
                                        onClick={
                                            sendOTP
                                        }
                                    >
                                        Send OTP
                                    </button>

                                    {

                                        confirmationResult &&

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
                                                className="login-btn"
                                                onClick={
                                                    verifyOTP
                                                }
                                            >
                                                Verify OTP
                                            </button>

                                        </>

                                    }

                                    <div
                                        id="recaptcha-container"
                                        className="mt-3"
                                    ></div>

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