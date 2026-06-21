import React from "react";
import "../../styles/Sidebar.css";

import LogoutService
from "../../services/LogoutService";

import Swal
from "sweetalert2";


function AgentSidebar({
    activeTab,
    setActiveTab
}) {

    const handleLogout = () => {

        Swal.fire({

            title: "Logout ?",

            text: "Do you want to logout?",

            icon: "question",

            showCancelButton: true,

            confirmButtonColor: "#dc3545"

        }).then((result) => {

            if (result.isConfirmed) {

                LogoutService.logout();

            }

        });

    };

    return (

        <div className="sidebar">

            <div>

                {/* HEADER */}

                <div className="sidebar-header">

                    <div className="sidebar-logo">
                        🏠
                    </div>

                    <h4 className="sidebar-title">
                        Agent CRM
                    </h4>

                    <small className="sidebar-subtitle">
                        Agent Portal
                    </small>

                </div>

                {/* PROFILE */}

                <div className="manager-profile">

                    <div>

                        <h6>
                            {
                                localStorage.getItem(
                                    "name"
                                )
                            }
                        </h6>

                        <small>
                            Agent
                        </small>

                    </div>

                </div>

                {/* MENU */}

                <div className="sidebar-menu">

                    <button
                        className={`sidebar-link ${
                            activeTab === "dashboard"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab(
                                "dashboard"
                            )
                        }
                    >

                        <i className="bi bi-grid-fill"></i>

                        Dashboard

                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "leads"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab(
                                "leads"
                            )
                        }
                    >

                        <i className="bi bi-people-fill"></i>

                        Assigned Leads

                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "followups"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab(
                                "followups"
                            )
                        }
                    >

                        <i className="bi bi-calendar-check-fill"></i>

                        Follow Ups

                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "visits"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab(
                                "visits"
                            )
                        }
                    >

                        <i className="bi bi-house-check-fill"></i>

                        Site Visits

                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "notes"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab(
                                "notes"
                            )
                        }
                    >

                        <i className="bi bi-journal-text"></i>

                        Lead Notes

                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "stats"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab(
                                "stats"
                            )
                        }
                    >

                        <i className="bi bi-bar-chart-fill"></i>

                        Statistics

                    </button>

                </div>

            </div>

            {/* FOOTER */}

            <div className="sidebar-footer">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </div>

        </div>
    );
}

export default AgentSidebar;