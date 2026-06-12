import React from "react";
import { Link } from "react-router-dom";

import "../../styles/Sidebar.css";

function Sidebar() {

  return (

    <div className="sidebar">

      <h4 className="sidebar-title">

        CRM Panel

      </h4>

      <Link
        to="/dashboard"
        className="sidebar-link"
      >
        <i className="bi bi-speedometer2"></i>
        Dashboard
      </Link>

      <Link
        to="/dashboard"
        className="sidebar-link"
      >
        <i className="bi bi-bell-fill"></i>
        New Leads
      </Link>

      <Link
        to="/dashboard"
        className="sidebar-link"
      >
        <i className="bi bi-person-check-fill"></i>
        Assigned Leads
      </Link>

    </div>

  );
}

export default Sidebar;