import React from "react";

import ManagerForm
from "../components/admin/ManagerForm";

import ManagerTable
from "../components/admin/ManagerTable";

import "../styles/Manager.css";

function ManagersPage() {

    return (

        <div className="admin-page">

            <h2 className="mb-4">
                Manager Management
            </h2>

            <ManagerForm />

            <div className="mt-4">

                <ManagerTable />

            </div>

        </div>

    );
}

export default ManagersPage;