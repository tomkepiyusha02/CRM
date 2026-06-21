import React from "react";
import "../../styles/Sidebar.css";

import LogoutService from "../../services/LogoutService";
import Swal from "sweetalert2";

function Sidebar({ activeTab, setActiveTab }) {

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

                {/* LOGO */}

                <div className="sidebar-header">

                    <div className="sidebar-logo">
                        🏢
                    </div>

                    <h4 className="sidebar-title">
                        CRM Panel
                    </h4>

                    <small className="sidebar-subtitle">
                        Manager Portal
                    </small>

                </div>

                {/* MANAGER CARD */}

                <div className="manager-profile">

                    <div>

                        <h6>
                            {localStorage.getItem("name")}
                        </h6>

                        <small>
                            Manager
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
                            setActiveTab("dashboard")
                        }
                    >
                        <i className="bi bi-grid-fill"></i>
                        Dashboard
                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "new"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("new")
                        }
                    >
                        <i className="bi bi-bell-fill"></i>
                        New Leads
                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "assigned"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("assigned")
                        }
                    >
                        <i className="bi bi-person-check-fill"></i>
                        Assigned Leads
                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "properties"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("properties")
                        }
                    >
                        <i className="bi bi-buildings-fill"></i>
                        Properties
                    </button>

                    {/* NEW AGENTS MENU */}

                    <button
                        className={`sidebar-link ${
                            activeTab === "agents"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("agents")
                        }
                    >
                        <i className="bi bi-people-fill"></i>
                        Agents
                    </button>

                    <button
                        className={`sidebar-link ${
                            activeTab === "stats"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("stats")
                        }
                    >
                        <i className="bi bi-bar-chart-fill"></i>
                        Statistics
                    </button>

                </div>

            </div>

            {/* LOGOUT */}

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

export default Sidebar;