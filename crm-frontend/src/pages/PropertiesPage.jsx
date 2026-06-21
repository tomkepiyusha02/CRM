import React, { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";

import PropertyForm from "../components/admin/PropertyForm";
import PropertyTable from "../components/admin/PropertyTable";

function PropertiesPage() {

    const [showForm, setShowForm] =
        useState(false);

    return (

        <AdminLayout>

<div className="page-header-modern">

    <div className="header-info">

        <div className="header-icon-box">

            <i className="bi bi-buildings-fill"></i>

        </div>

        <div>

            <h1 className="page-title-modern">
                Properties
            </h1>

            <p className="page-subtitle-modern">
                Manage all listed properties
            </p>

        </div>

    </div>

    <button
        className="add-btn"
        onClick={() => setShowForm(true)}
    >
        <i className="bi bi-plus-circle me-2"></i>
        Add Property
    </button>

</div>

            {
                showForm &&
                <PropertyForm />
            }


<div className="table-card">

<PropertyTable />

</div>

        </AdminLayout>
    );
}

export default PropertiesPage;