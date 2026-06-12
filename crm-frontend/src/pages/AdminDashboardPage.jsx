import React from "react";
import { Link } from "react-router-dom";

import "../styles/Admin.css";

import LogoutService from "../services/LogoutService";
import Swal from "sweetalert2";

import AdminCards from "../components/admin/AdminCards";
import LeadCharts from "../components/admin/LeadCharts";
import PropertyChart from "../components/admin/PropertyChart";
import ManagerChart from "../components/admin/ManagerChart";

function AdminDashboardPage() {

    const handleLogout = () => {

        Swal.fire({
            title: "Logout ?",
            text: "Do you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            confirmButtonText: "Logout"
        }).then((result) => {

            if (result.isConfirmed) {

                LogoutService.logout();

            }

        });

    };

    return (

        <div className="admin-page">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>
                        Admin Dashboard
                    </h2>

                    <h5 className="text-muted">
                        Welcome, {localStorage.getItem("name")}
                    </h5>

                    <p className="mb-0">
                        Real Estate CRM Analytics Overview
                    </p>

                </div>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                </button>

            </div>

            {/* Dashboard Cards */}

            <AdminCards />

            {/* Quick Actions */}

            <div className="row mt-4">

                <div className="col-md-4 mb-3">

                    <Link
                        to="/admin/managers"
                        className="btn btn-primary w-100"
                    >
                        <i className="bi bi-people-fill me-2"></i>
                        Manage Managers
                    </Link>

                </div>

                <div className="col-md-4 mb-3">

                    <Link
                        to="/admin/agents"
                        className="btn btn-success w-100"
                    >
                        <i className="bi bi-person-badge-fill me-2"></i>
                        Manage Agents
                    </Link>

                </div>

                <div className="col-md-4 mb-3">

                    <Link
                        to="/admin/properties"
                        className="btn btn-warning w-100"
                    >
                        <i className="bi bi-building-fill me-2"></i>
                        Manage Properties
                    </Link>

                </div>

            </div>

            {/* Charts */}

            <div className="row mt-4">

                <div className="col-lg-6 mb-4">

                    <LeadCharts />

                </div>

                <div className="col-lg-6 mb-4">

                    <PropertyChart />

                </div>

            </div>

            <div className="row">

                <div className="col-lg-12">

                    <ManagerChart />

                </div>

            </div>

        </div>

    );
}

export default AdminDashboardPage;