import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {

    return (

        <div className="admin-sidebar">

            <h3 className="logo">

                CRM Admin

            </h3>

            <ul>

                <li>
                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/admin/managers">
                        Managers
                    </Link>
                </li>

                <li>
                    <Link to="/admin/agents">
                        Agents
                    </Link>
                </li>

                <li>
                    <Link to="/admin/properties">
                        Properties
                    </Link>
                </li>

            </ul>

        </div>

    );
}

export default AdminSidebar;