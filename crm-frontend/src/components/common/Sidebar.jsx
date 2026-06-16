import React from "react";

import "../../styles/Sidebar.css";

function Sidebar({
    activeTab,
    setActiveTab
}) {

    return (

        <div className="sidebar">

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

                    <i className="bi bi-grid-fill me-2"></i>

                    Dashboard

                </button>

                <button
                    className={`sidebar-link ${
                        activeTab === "new"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveTab(
                            "new"
                        )
                    }
                >

                    <i className="bi bi-bell-fill me-2"></i>

                    New Leads

                </button>

                <button
                    className={`sidebar-link ${
                        activeTab === "assigned"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveTab(
                            "assigned"
                        )
                    }
                >

                    <i className="bi bi-person-check-fill me-2"></i>

                    Assigned Leads

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

                    <i className="bi bi-bar-chart-fill me-2"></i>

                    Statistics

                </button>

            </div>

            <div className="sidebar-footer">

                <div className="manager-profile">

                    <img
                        src={`https://ui-avatars.com/api/?name=${localStorage.getItem("name")}&background=4f46e5&color=fff`}
                        alt=""
                        className="manager-avatar"
                    />

                    <div>

                        <h6>

                            {
                                localStorage.getItem(
                                    "name"
                                )
                            }

                        </h6>

                        <small>

                            Manager

                        </small>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Sidebar;