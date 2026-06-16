import React from "react";

import PropertyForm
from "../components/admin/PropertyForm";

import PropertyTable
from "../components/admin/PropertyTable";

import "../styles/Property.css";

function PropertiesPage() {

    return (

        <div className="property-page">

            <h2 className="mb-4">
                Property Management
            </h2>

            <PropertyForm />

            <div className="mt-4">

                <PropertyTable />

            </div>

        </div>

    );
}

export default PropertiesPage;